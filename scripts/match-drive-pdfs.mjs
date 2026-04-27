#!/usr/bin/env node
/**
 * Match the PDFs in the public Drive folder
 *   https://drive.google.com/drive/folders/14FQBEm5soq-IX32I5R4x1ZkSWWwmkanF
 * against entries in data/publications.json and fill in the `pdf` field
 * with `https://drive.google.com/file/d/<id>/view?usp=drive_link`.
 *
 * Matching heuristic:
 *   1. Extract the year from the filename (4-digit number 2000–2030).
 *   2. Extract candidate surnames: lowercase letter runs in the filename.
 *   3. A publication matches if its year equals the filename year AND any
 *      author surname appears as a word in the filename.
 *
 * Reports anything left unmatched at the end so we can inspect manually.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const PUBS = path.join(repoRoot, "data", "publications.json");

// Drive folder listing (name → file ID), captured from the embeddedfolderview.
const FILES = [
  ["Adams2020AAC.pdf", "19Pc0vIVR05KrAEePjEJl1jU6RQ6jdhh4"],
  ["Akhtar2026.pdf", "1m66y5-4Hhc5wUwIFK33aBmY6r7qxKK8a"],
  ["almiron2013cm.pdf", "1_BWLUFfL0F7IR1MO52zcax-pHqRMCkgO"],
  ["almuzara2012jcm.pdf", "1tiaYtRYvjDGHYyfzuv6CA62SXXoVbxph"],
  ["almuzara2013jcm_2.pdf", "1ezKCof4cXsCEO1Pt6jGn5k-7yJ_ZLZVY"],
  ["almuzara2014jcm.pdf", "1Su6Zeo34PQiPMmHN2aTdIOy_sMIEMJV4"],
  ["almuzara2015JMM.pdf", "1AAzdp7rci6Jk9z6iTlu9ESFzRzjVsa6E"],
  ["Almuzara2015jmmcr.pdf", "1Q2F4VQlxh912dvJYNaG2d5h3gjDDvAAM"],
  ["almuzara2017JGAR.pdf", "1mmU18a3G-b6BWUG1PKoANoo4S3namHHW"],
  ["almuzara2018jgar.pdf", "1Lklf7OWlsotyqnJdTc7sWrOYSGJmcKj9"],
  ["Almuzara2024IPP.pdf", "1QSIBEeOkL1sWZzT15aEYauN9Q0B46zEq"],
  ["antibiotics-14-00620-v2.pdf", "1gFXRtLNJscprShadqAN25Q0OkvUSZ1Kb"],
  ["antibiotics-14-00832.pdf", "1wvwmK-fEEqgh__RZhv3jTw4gGqK6ibD6"],
  ["artimano2013ga.pdf", "1rXs8rpx4VGE-Bb3b1AiaTw44DrxtIbSI"],
  ["Balaceanu_Buitrago_Walther_Hospital_Dans.NAR2019.pdf", "1l-GMyBSEHNaury9m3vetW1gYpTOuJFUv"],
  ["Balaceanu_Pasi_Dans.JPCL2016.pdf", "1MzHR3m6w0uE7itk3Ri3QeOlmctVjV9af"],
  ["Balaceanu_Perez_Dans.NAR2018.pdf", "11jYPryEKfYBbh1HAWFeu16T6HWZqBtti"],
  ["baraka2020antibiotics.pdf", "1k9Mn7RXYt2DqA1VhK9hrnjhMfMO4Lz3r"],
  ["Barberis2018jmmcr.pdf", "1u1vM_Hxd668O-Wph06VcJKtI3uB6nxTN"],
  ["barberis2021acmi.pdf", "1nUPpkS8maJI4G8EP4vScKFf7oUiN7fpD"],
  ["barberis2024DMID.pdf", "1ayvcfnR1Iez_SCgQu5atCir-30JhIZTT"],
  ["barberis2026.pdf", "1hrfNKEUcNtcXpCqY5GyAAOvfTdtLxTbL"],
  ["batallones2019SR.pdf", "18kjt_jt0O0GyMlQxwmMGT6c77zy1kh-5"],
  ["Battistini_Dans.PLOSCompBio2021.pdf", "1LID0mkHoHseQg6O59n0dVU183Xi8B44b"],
  ["Battistini_Hospital_Buitrago_Gallego_Dans.JMB2019.pdf", "1g_n2GhxvJvotNPYzsltEWMQmAlHq9105"],
  ["Buitrago_..._Dans.NatComm2021.pdf", "1cv6nvgmbOmKGe-IjyJDb5DSkIT1fc6ra"],
  ["Capitulo1_vFinal_verif.pdf", "10AxF6ouGF9n5JeJvW_iQl97yidXmX34X"],
  ["Capitulo2_vFinal_verif.pdf", "1pvo27ecQanSB03Q2zUO9rsHo7pXTr3yp"],
  ["Capitulo3_vFinal_verif.pdf", "1wEue8i1iXBAE8JeNhDVU_vWalLqeAmJD"],
  ["Capitulo4_vFinal_verif.pdf", "1KB98NvP3d2gqyn6LFAWrw1NHVjmzF5pE"],
  ["Capitulo5_vFinal_verif.pdf", "1syxnkn8TwAyyVMtPGRZcLIuqYG0Kz9DD"],
  ["Casin2021AAC.pdf", "1NkBEPGC9HvcC4hsvC40N3S4WPea1UO4d"],
  ["Cerbino2023.pdf", "1_2n_pwsbpAySd4slRySqimPzQLxSu-Zu"],
  ["collins2018CM.pdf", "1sgLTnDgZm_nAVa1w7H-YaQUYD20rnklh"],
  ["Cuervo_Dans.PNAS2014.pdf", "1QptgsxYq5jdzGzlVqmJE8P5s3lmFIy7Q"],
  ["Dans.BIOPHYSREV2024.pdf", "1B9QcQ-_VxRS0dC-DKGA5jHRZIfGpLMAV"],
  ["Dans.BSB2013.pdf", "1L37-gK2fQu9wl-BBAhXRIpM6jy9TIXuw"],
  ["Dans.CHEM2018.pdf", "1SRlaSITHLCX6UvncVDxisi5N1L1fONb4"],
  ["Dans.COSB2016.pdf", "1D8psUHJGNJC4DQ6UlKJhH0RG2pmOyUoy"],
  ["Dans.JCIM2009.pdf", "1JsFkY3appx_3B-tFToEkxhyOiBfl4bnF"],
  ["Dans.JCTC2008.pdf", "1PxobKJr4lLj5rUeeMeM7JAhvQ9IEuUIE"],
  ["Dans.JCTC2010.pdf", "1jIc_7iAUS64jaWvWb0eNifFg6xr9iMkz"],
  ["Dans.NAR2012.pdf", "12c2bJdycMZzRMlhF2VjxXBw677W4fjub"],
  ["Dans.NAR2014.pdf", "1BndEsI6kyRSON8RiIcSbto1RSgYxcKTi"],
  ["Dans.NAR2016.pdf", "1-g0NgjqqzVL7PolEH5dBV3rk1tXWs78f"],
  ["Dans.NAR2017.pdf", "1H05quj6R1xPIEtEZxogvs0rWyPFnSjUF"],
  ["Dans.NAR2019.pdf", "1oj0G2ebCHA8l9qc5Pauxj4bLLroC9Z9X"],
  ["daRosa_Dans.BiophysicalRev2021.pdf", "1H2qZ0X3uFlsV83MB4EtqFqG_4dGj8_b-"],
  ["daRosa_Dans.WIRES2025.pdf", "1AH9sZZqBVRH4SB0SkkPU6-11UeO7gDu4"],
  ["daRosa_Grille_Dans.JCIM2024.pdf", "1Qu4EKUThJXz0TVoeDqqyeTf0e6ohZex7"],
  ["Darre_Ivani_Dans.JACS2016.pdf", "10RZC7AnGREwlGdRPpFGXK10SkZMMqhLG"],
  ["Darre_Machado_Dans.JCTC2010.pdf", "1LgLQpgzbBruy6HFkgJ8bOV5dhMdjDTlF"],
  ["DeMarco_Dans.AA2010.pdf", "1UVVMwOD__CZMfNJbmZxLaIPAeVGb5Bfk"],
  ["diana2024FVet.pdf", "1JTqy2DkPzxFZH10pbe_QiinNT9gM36sA"],
  ["Escalante2024.pdf", "1U_0bpW9j1g9imj3C_mt2g2tr5kSwwoqz"],
  ["Galindo_..._Dans.LiveCoMS2025.pdf", "1RozTcVoGDQKIGIeH4lJWXTpudZVByAZs"],
  ["Gallego_Darre_Dans.BIOINFO.2019.pdf", "1kByNiGil5n55N4zc8L-0FUQ-XfJgpLdx"],
  ["Garcia2022.pdf", "1AkV8oe7ykstptf9VOVJ_akdWmCuFOThJ"],
  ["Gomez_Walther_Darre_Ivani_Dans.CTCB2017.pdf", "1qKqfNnqBK0qE9pBhT2BmpZby7zZFCUwW"],
  ["Grille.RNA2023.pdf", "1CDaW7_jjj7K2OpVHivQ5250wN6-arUtt"],
  ["Hamsa2025.pdf", "1MTWOpgvgW8Fs6TfUTRRBqPcBYxtGRzVJ"],
  ["Hoard2020CM.pdf", "1C9mtZwvMoXySq6j6-hWMau5X5lVbjHs9"],
  ["Hospital_Andrio_Cugnasco_Codo_Becerra_Dans.NAR2015.pdf", "1R1O3kQzTBmUg8hDoLsjO1gDqz0hjPljt"],
  ["ijms-25-11424.pdf", "1n83IQTW1-TU7ZhMHccuv_L69gw-nnXFU"],
  ["Ivani_Dans.NM2016.pdf", "1iL9BGuSb1xyTHfdzPuCMS-cr6raDgHFB"],
  ["Janin_..._Dans.ACTANEUROPATHOLOGICA2019.pdf", "1w4o9d4QQPimWIq-H-sLY5szL2p_x9d5w"],
  ["jiaf567.pdf", "14PmLMSJ5iKUZ6b2u5OG8GeDvyPnhPYql"],
  ["Kalbfleisch2024NatGen.pdf", "1PVDJewgukMaVIDOmaz328-eVuGrLkkwv"],
  ["Kuzmanic_Dans.CHEM2019.pdf", "1cohckFi7SZlt3sXKw4MKHOoeYitwqEp7"],
  ["Legaria2020Anaerobe.pdf", "1VYusmZ51_pZ4UnrvAaXoCTkrCVQaXSFh"],
  ["Lin2020Antibiotics.pdf", "15qq40kuBwXbruvhYfuXcgiPJXmH_5igh"],
  ["Llauger_..._Dans.MBIO2023.pdf", "1Pc4IqS3IhQIE5iooUZfeQ87hYRFMsJBC"],
  ["Love_Galindo_..._Dans.JCTC2024.pdf", "1RlHWSlDCPB6LnJSRuRUUVbW9quCTqNP1"],
  ["Machado_Dans.AA2010.pdf", "1Q1lGUC8eo4t3Q-b8urIm5Ab_isJ-m15U"],
  ["Machado_Dans.PCCP2011.pdf", "1UjqPa52Cg-ORwNfVk0y5UdTJnkiAutt4"],
  ["Maddocks_Dans.BIOPHYSREV2024.pdf", "1xaiR_4x1GEO1t2jN67zBpCgrN6ykP5AI"],
  ["Martin_Dans.PLOSCOMPBIOL2022.pdf", "18kXncV05Yy_DCphs5PmpmwxzYD4Tzo3s"],
  ["martinez-sanguiné-et-al-salmonella-enterica-serovars-dublin-and-enteritidis-comparative-proteomics-reveals-differential.pdf", "1s7Y5AVLKPI7O8MkIV1dW6aEYCOmW8-qv"],
  ["mezcord-et-al-2026-vitamin-b12-promotes-cefiderocol-resistance-and-small-colony-variants-in-carbapenem-resistant.pdf", "1BaC8S6_vxya3GFdlvjkbg5B3SixbQYbQ"],
  ["Mezcord2023ijms.pdf", "1L8CUZFOJeCbecHriD_XiFOnVACq80Nus"],
  ["montalvo2025.pdf", "1pWC04n6pwR75xHl5dLLRmQM2l2efgJ-f"],
  ["montana2015CM.pdf", "1celRd9N2ZuoNBHX1CkYqsApEj-HVZDGg"],
  ["montana2016plos.pdf", "1LpYuO6aCks3cQiy6FSjHcbZ2mBGCSFEY"],
  ["Montana2020JGAR.pdf", "13n2rY6uJt4XeGag5NRb7tydgqFOBNQRc"],
  ["Neguembor.NSMB.2022.pdf", "1SmK1N9JF4p-dB2LSfOJx5JAInPgc5WVj"],
  ["Olson_Maddocks_Dans.BIOPHYSREV2024.pdf", "15XRUtp6qNk0YK2Y51HdX5dlJX9CC_PaO"],
  ["papalia2013jcm.pdf", "13ZZ3uMmALzgsyP0xNFvpYBy1SvfhmXKa"],
  ["papalia2018jgar.pdf", "18cGD5iwr6ELHnIvJ89dAXmGeSLDVpewq"],
  ["papalia2020ram.pdf", "1PlFniaanpndMK-HhstXZyKBpB9AFnwer"],
  ["Parisis_Dans.NATCOMM2023.pdf", "1OzpBdp4NW9vUE4FSSgXKk8jBW8AbXxs6"],
  ["Pasi_Maddocks_Beveridge_Bishop_Case_Cheatham_Dans.NAR2014.pdf", "17N6z4RjE_5HSf-22i1z0l4HbBcmGdPmp"],
  ["Perez_Palomo_Perez_Gil_Dans.JMC2011.pdf", "1eJMWo2yT5A0uBTokMoNWn1AF07ZiQkLv"],
  ["quinn2018CM.pdf", "1iezDueATePHeEIXUjVlcUJ6FKD-kBeuw"],
  ["quinn2018SR.pdf", "1rrmZik2Pv9_gKJwJnTJHowS3Vd0pv8Qu"],
  ["Racero2021.pdf", "1kHh7YjVbVim-QRV5QCwZNAipjqlboJYP"],
  ["ramirez2014SM.pdf", "1AHJHK7uG7MyufGMJLA7Q4tFFxBsP8H_z"],
  ["ramirez2015jmm.pdf", "1Ovf5tuBCBhndEgLjHs0XoxQQXedT9A9N"],
  ["Ramirez2016GBE.pdf", "11_wkVuA1NS1kJrnn-kagW_U564BEwNXG"],
  ["Ramirez2019fmicb.pdf", "1KRUcc5rlLdAQ9XFdfcnlUytoLls4yu4n"],
  ["Rodgers2020JGAR.pdf", "1T8FgEeiJkPL_rEUDC1Qpz_3SdfI8QAsR"],
  ["Rodriguez2019IJAA.pdf", "18sfOwhHxuv-iegghMP51F2ig22_ZID9B"],
  ["Rodriguez_Barraco_Dans.AA2018.pdf", "1eAmjVOEdBXfpIeF9ZQExm2EuIUmq5VLM"],
  ["Rodriguez_Dans.PLANTA2019.pdf", "1Re7Auyu8d7SMMAEzCv2IEnAwat7WnQx2"],
  ["Rodriguez_daRosa_..._Dans.BIOCHIMIE2020.pdf", "1xW11S2Wf41JFnpchkUQDWYJQ1O9rBqcD"],
  ["Rossetti_Dans.NAR2015.pdf", "1hTfU2-o5Cs4ItrrOKuhodPMf3EVarxgU"],
  ["Ruifang_daRosa_Dans.BIOCHEM2020.pdf", "1vqs7ByIJHb88xHVzAk7lnsG507ZWjHD7"],
  ["SaintLeger_Bello_Dans.SCIENCEADV2016.pdf", "1yMPeZobcWtDjz_paJ68qxtKtnXzXHEzE"],
  ["Schramm2020fmicb.pdf", "1zR_axmk0nt8NLsTKM0Sjm8Yci9zd3D4c"],
  ["Signorelli_Dans.PLOSone2015.pdf", "1rHsKYkLHbydUkWi7Et-gx5RSH7B7Exlt"],
  ["Sweeny_Singh_..._Dans.JBC2018.pdf", "1DxbUZDvRxw6wR_Xn1KrT91Dtqds-yUPX"],
  ["traglia2012BOA.pdf", "1hVzy7NgcqWaa9wEVBYCJAgmSM0Bh8YBl"],
  ["traglia2012CM.pdf", "1hWL2V4CRBpls_E-eqjv5Na6Ijn0uqgDj"],
  ["traglia2013CM.pdf", "1HVboe_e_00V5Ht1ZElSEV3U9_sAdSih4"],
  ["traglia2014CM_2.pdf", "1heWX2C-cb9Ko5-Qp6UOLsFAPDP61Ik24"],
  ["traglia2014ga.pdf", "1TL13XZr1kpk9ESj1i5KQlbq1W4eUK72O"],
  ["traglia2014gbe.pdf", "1NS_AtXYyNFMe4qMwxRR-QOvfmpvCj5hl"],
  ["traglia2014JCDM.pdf", "1OdhruJJ_XhjB8Ak4kcY7lwwpriip5QfG"],
  ["traglia2015ga.pdf", "1hLwIJBXFYYObBv0Qml8E5c2hXplyfQZy"],
  ["traglia2015ga_2.pdf", "1uG8aQzlzhA7u_kNApsS3DLSZE1j2DSas"],
  ["traglia2016aac.pdf", "1HjbF-F3n6iIxrUIt8Lbz9x_oR3L0RObL"],
  ["Traglia2018SR.pdf", "1LeN8UaI4kQv43lwQIhA8QChzSMPGYe1x"],
  ["Traglia2019IJAA.pdf", "1ijw62Wkhm-ZuM3kqTNUEcT3xX6vVtVhc"],
  ["Traglia2023Biology.pdf", "1kHpTFuRyg8t1UP5LoJxkGs1kqWoKEM9D"],
  ["Traglia2023JGAR.pdf", "1AoGOSXD4K1I8q1-49g7903pwxyHdV7WB"],
  ["Traglia2024acmi.pdf", "16Doyj7e7LclBfRr5-AMlz7EVsQ-9HdT4"],
  ["Traglia2024FrontMicro.pdf", "1TDMjGkQ781mRlZ5cAGcYamVZV9onjqGr"],
  ["Traglia2024IJAA.pdf", "1v2M4VTeR_wjF-cR81VYxuots9FE_x4Zt"],
  ["Traglia2024IJAA_2.pdf", "1oCO6srpG_zWbc6izZUuEavpSeJz2uKln"],
  ["Traglia2024ijms.pdf", "1nDHPLA7I1LRfEMcYAs22QTJ4icOlLm3D"],
  ["traglia2024MRA.pdf", "1JfEN4KdbU2MHSilDAtqkYn20OkSoifnx"],
  ["Varnado2026.pdf", "1rdMMe3xOZotE9FLH94ae4S1v9C9uo1Vu"],
  ["vilacoba2013aac.pdf", "11eB6eo7n0gL-sRlWyYl40yj52MDOu-7e"],
  ["vilacoba2014ga.pdf", "1MeUz5XSPtQXF3Jt6_3mCfrT15SPcjpVm"],
  ["vilcoba2016.pdf", "1pDitzHZ5Qc9bCzCp0w7Et1_MCPcx1rWx"],
  ["Walther_Dans.NAR2020.pdf", "1Zyit1sk5DYy579esyYdaV5mlifAIZyn_"],
  ["wong2024.pdf", "1quH5wp-PU6ksAV1GtD6KMUskMeemF6"],
  ["Zeida_Machado_Dans.PRE2012.pdf", "14PtykvnTY4Ay1gszrWGcQRLtNRI25xRL"],
];

// Filenames that don't correspond to a publication entry (theses, chapters,
// summary indices, or duplicates of another file) — skip silently.
const SKIP = new Set([
  "Dans.TesisDoctoral2008.pdf",
  "Dans.TrabajoEspecial1.2000.pdf",
  "Dans.TrabajoEspecial2.2001.pdf",
  "Capitulo1_vFinal_verif.pdf",
  "Capitulo2_vFinal_verif.pdf",
  "Capitulo3_vFinal_verif.pdf",
  "Capitulo4_vFinal_verif.pdf",
  "Capitulo5_vFinal_verif.pdf",
  "IndiceResumen_vFinal_verif.pdf",
  // duplicate of ijms-25-11424.pdf (same Traglia 2024 IJMS article)
  "Traglia2024ijms.pdf",
]);

// Manual overrides for filenames where the heuristic can't match (year
// mismatch between filename and publication, MDPI-style filenames, etc.).
// key = unique substring of pub.title — value = filename.
const MANUAL_BY_TITLE = {
  // OUP-style filenames without surname
  "Ampicillin/sulbactam in combination with ceftazidime/avibactam":
    "jiaf567.pdf",
  // MDPI-style filenames (journal-volume-article)
  "First Report in the Americas": "antibiotics-14-00620-v2.pdf",
  "Spontaneous Emergence of Cefiderocol Resistance":
    "antibiotics-14-00832.pdf",
  "Insights into Acinetobacter baumannii AMA205": "ijms-25-11424.pdf",
  // File names where year disagrees with the publication's official year
  // (preprint year vs print year, online vs issue year, etc.)
  "Genomic Insights of Two Acinetobacter Non-Baumannii": "Akhtar2026.pdf",
  "Interplay between meropenem and human serum albumin": "Casin2021AAC.pdf",
  "Intra-peritoneal abscess after an abdominal hysterectomy":
    "Legaria2020Anaerobe.pdf",
  "Salmonella enterica serovars Dublin and Enteritidis":
    "martinez-sanguiné-et-al-salmonella-enterica-serovars-dublin-and-enteritidis-comparative-proteomics-reveals-differential.pdf",
  "An open call for contributions": "Olson_Maddocks_Dans.BIOPHYSREV2024.pdf",
  "Human serum albumin alters specific genes": "quinn2018SR.pdf",
  "Genetic and phenotypic features of a novel acinetobacter species":
    "Schramm2020fmicb.pdf",
  "Connecting proline and": "Signorelli_Dans.PLOSone2015.pdf",
  "Genome sequence analysis of an extensively drug-resistant Acinetobacter baumannii indigo-pigmented strain depicts evidence":
    "Traglia2018SR.pdf",
  "Draft genome sequence of an international clonal lineage 1":
    "vilacoba2014ga.pdf",
  "A Multi-Modal Coarse-Grain Model": "Walther_Dans.NAR2020.pdf",
  "Hetero-antagonism of avibactam": "wong2024.pdf",
  // Almuzara 2015 has three papers — pin each to its filename
  "Evaluation of matrix-assisted laser desorption ionization":
    "almuzara2015JMM.pdf",
  "Isolation of Bordetella species from unusual infection sites":
    "Almuzara2015jmmcr.pdf",
  "A taxonomically unique Acinetobacter strain with proteolytic":
    "almuzara2014jcm.pdf",
  // Hospital BIGNASim
  "BIGNASim": "Hospital_Andrio_Cugnasco_Codo_Becerra_Dans.NAR2015.pdf",
  // Rodriguez-Decuadro Peltophorum 2020 (Biochimie)
  "Antimicrobial peptides in the seedling transcriptome":
    "Rodriguez_daRosa_..._Dans.BIOCHIMIE2020.pdf",
  // Traglia 2014 GBE
  "Whole-genome sequence analysis of the naturally competent":
    "traglia2014gbe.pdf",
  // Quinn pair: Sci Rep 2018 + Current Microbiology 2019
  "Effect of host human products on natural transformation":
    "quinn2018CM.pdf",
  // Rossetti and Ruifang DNA-mismatch / nitric-oxide papers
  "structural impact of DNA mismatches": "Rossetti_Dans.NAR2015.pdf",
  "Molecular Determinants for Nitric Oxide Regulation":
    "Ruifang_daRosa_Dans.BIOCHEM2020.pdf",
  // Traglia 2014 Bacteremia (file is "JCDM" though pub says different journal)
  "Bacteremia caused by an Acinetobacter junii": "traglia2014JCDM.pdf",
  // Traglia 2024 MRA — Lacticaseibacillus
  "Draft genome sequence of Lacticaseibacillus rhamnosus":
    "traglia2024MRA.pdf",
};

// Quirky filename overrides: filename → year/surname overrides
const FILENAME_FIXES = new Map([
  ["Hamsa2025.pdf", { surnames: ["hamza"], year: 2025 }],
  ["artimano2013ga.pdf", { surnames: ["armitano"], year: 2013 }],
  ["vilcoba2016.pdf", { surnames: ["vilacoba"], year: 2016 }],
  // Multi-author filenames where the LAST name token before the journal hint is the corresponding-author surname.
  // For Pablo's papers, that's "Dans" and the year sits next to the journal abbreviation.
  // For Traglia's CV files, the year is right after the leading surname.
]);

// --- helpers -------------------------------------------------------------
function lower(s) {
  return s.toLowerCase();
}
function stripAccents(s) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function lastName(authorString) {
  // First author surname = last token of the first comma-separated entry.
  const first = authorString.split(",")[0].trim();
  const tokens = first.split(/\s+/).filter(Boolean);
  return stripAccents(lower(tokens[tokens.length - 1] || ""));
}
function allSurnames(authorString) {
  return authorString
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const tokens = p.split(/\s+/).filter(Boolean);
      return stripAccents(lower(tokens[tokens.length - 1] || ""));
    })
    .filter((s) => s && s !== "et" && s !== "al." && s !== "al" && s !== "others");
}

function fileTokens(filename) {
  const base = filename.replace(/\.pdf$/i, "");
  // Insert separators at letter/digit and case boundaries so
  // "almuzara2012jcm" becomes "almuzara 2012 jcm" and "Adams2020AAC"
  // becomes "Adams 2020 AAC".
  const split = stripAccents(base)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    .replace(/(\d)([a-zA-Z])/g, "$1 $2");
  const cleaned = lower(split).replace(/[^a-z0-9]+/g, " ");
  return new Set(cleaned.split(/\s+/).filter(Boolean));
}

function fileYears(filename) {
  const matches = filename.match(/(?:19|20)\d{2}/g) || [];
  return matches.map((y) => parseInt(y, 10)).filter((y) => y >= 2000 && y <= 2030);
}

// --- main ----------------------------------------------------------------
const pubs = JSON.parse(fs.readFileSync(PUBS, "utf8"));
const matched = new Map(); // pub index → filename
const usedFiles = new Set();

// Pass 1: manual title-based matches
for (const [titleSubstring, fname] of Object.entries(MANUAL_BY_TITLE)) {
  const idx = pubs.findIndex((p) =>
    lower(p.title || "").includes(lower(titleSubstring))
  );
  if (idx !== -1 && !matched.has(idx)) {
    matched.set(idx, fname);
    usedFiles.add(fname);
  }
}

// Pass 2: heuristic year + surname match
for (const [fname, _id] of FILES) {
  if (SKIP.has(fname) || usedFiles.has(fname)) continue;
  const fix = FILENAME_FIXES.get(fname);
  const tokens = fileTokens(fname);
  const yearsInFile = fix?.year ? [fix.year] : fileYears(fname);
  if (yearsInFile.length === 0) continue;

  const surnameHints = fix?.surnames ?? null;

  // Candidates: pubs with matching year AND any surname appearing in tokens.
  const candidates = [];
  pubs.forEach((p, idx) => {
    if (matched.has(idx)) return;
    if (!yearsInFile.includes(p.year)) return;
    const surnames = allSurnames(p.authors || "");
    const hits = surnames.filter((sn) =>
      surnameHints ? surnameHints.some((h) => sn.includes(h)) : tokens.has(sn)
    );
    if (hits.length === 0) return;
    candidates.push({ idx, hits, firstHit: hits[0] });
  });

  if (candidates.length === 0) continue;

  // Prefer the candidate whose first author matches a hit.
  let best = candidates.find(
    (c) => lastName(pubs[c.idx].authors || "") === c.firstHit
  );
  if (!best) best = candidates[0];
  matched.set(best.idx, fname);
  usedFiles.add(fname);
}

// Apply: write `pdf` field on matched pubs.
const fileById = new Map(FILES.map(([n, id]) => [n, id]));
let updated = 0;
for (const [idx, fname] of matched.entries()) {
  const id = fileById.get(fname);
  if (!id) continue;
  const url = `https://drive.google.com/file/d/${id}/view?usp=drive_link`;
  if (pubs[idx].pdf !== url) {
    pubs[idx].pdf = url;
    updated++;
  }
}

fs.writeFileSync(PUBS, JSON.stringify(pubs, null, 2) + "\n");

// Reports
const unmatchedFiles = FILES.filter(
  ([n]) => !SKIP.has(n) && !usedFiles.has(n)
).map(([n]) => n);

const pubsWithoutPdf = pubs
  .map((p, i) => ({ p, i }))
  .filter(({ p }) => !p.pdf)
  .map(({ p, i }) => `  #${i + 1} (${p.year}) ${p.authors.split(",")[0]} — ${p.title.slice(0, 70)}`);

console.log(`[match-drive-pdfs] matched ${matched.size} files; ${updated} pdf urls updated`);
console.log(`[match-drive-pdfs] unmatched files (${unmatchedFiles.length}):`);
for (const u of unmatchedFiles) console.log(`  ${u}`);
console.log(`[match-drive-pdfs] publications still without pdf (${pubsWithoutPdf.length}):`);
for (const u of pubsWithoutPdf) console.log(u);
