/**
 * 해당 type 들은 공통 컴포넌트 타입과 비슷한 것들이 있지만
 * 별개의 type으로 인지하고 사용 하도록 합니다.
 *
 * 김종윤 수석매니저
 */

// string 또는 number object
export interface KeyIndex<T> {
  [index: string]: T
}

export interface Options {
  text: string
  value: any
}

export interface OptionGroup {
  [index: string]: Options[]
}

export interface RegExpCase extends KeyIndex<RegExp> {}

export type JSON = string


/**
 * ENUM 상수 관리
 */

// 고객 DB 유입 경로
// [페이지, API, 개별등록, 일괄등록]
export const funnelType = {
  DB_FROM_PAGE: 1,
  DB_FROM_API: 2,
  DB_FROM_EACH: 3,
  DB_FROM_BATCH: 4,
} as const

export type FunnelType = typeof funnelType[keyof typeof funnelType]

// 휴지통 사유 코드
// [연락처, 매체코드, 중복, 차단, 단어]
export const binType = {
  BIN_PHONE: 1,
  BIN_MEDIA: 2,
  BIN_DUPLICATE: 3,
  BIN_BLOCK: 4,
  BIN_WORD: 5,
} as const

export type BinType = typeof binType[keyof typeof binType]

// 공통 검색 조건
// [전체, 이름, 연락처, 매체, 매체코드]
export const searchType = {
  SEARCH_ALL: 1,
  SEARCH_NAME: 2,
  SEARCH_PHONE: 3,
  SEARCH_MD: 4,
  SEARCH_MD_CODE: 5,
} as const

export type SearchType = typeof searchType[keyof typeof searchType]

// 공통 성별
// [남, 여, 남/여]
export const genderType = {
  GENDER_MALE: 1,
  GENDER_FEMALE: 2,
  GENDER_ALL: 3,
} as const

export type GenderType = typeof genderType[keyof typeof genderType]

// API 연동 ContentType
// [json, x-www-fom-urlencoded]
export const apiContentType = {
  API_CONTENT_JSON: 1,
  API_CONTENT_FORM: 2,
} as const

export type ApiContentType = typeof apiContentType[keyof typeof apiContentType]

// API 연동 method
export const apiMethodType = {
  API_METHOD_POST: 1,
  API_METHOD_GET: 2,
} as const

export type ApiMethodType = typeof apiMethodType[keyof typeof apiMethodType]

// API 연동 Response type
export const apiResponseType = {
  API_RES_JSON: 1,
  API_RES_TEXT: 2,
} as const

export type ApiResponseType = typeof apiResponseType[keyof typeof apiResponseType]

// 멤버 권한 구분
// [슈퍼관리자, 마스터, 맴버, 매체사]
export const authPermiType = {
  AUTH_SUPER: 1,
  AUTH_MASTER: 2,
  AUTH_MEMBER: 3,
  AUTH_MEDIA: 4,
} as const

export type AuthPermiType = typeof authPermiType[keyof typeof authPermiType]

// DB 항목 설정

// 광고주 카테고리 - 건강,의료
// [건강보조식품(여성), 건강보조식품(남성), 건강보조식품(공용), 건강보조식품(유아/청소년), 다이어트식품, 병원/의원/의료기관, 의료기기, 건강정보/서비스, 기타]
export const medicalCategory = {
  MEDI_WOMAN: 1,
  MEDI_MAN: 2,
  MEDI_ALL: 3,
  MEDI_CHILD: 4,
  MEDI_DIET: 5,
  MEDI_HOSPITAL: 6,
  MEDI_EQUIP: 7,
  MEDI_INFO: 8,
  MEDI_ETC: 9,
} as const

export type MedicalCategory = typeof medicalCategory[keyof typeof medicalCategory]


// 광고주 카테고리 화장품, 미용
// [미용케어/서비스, 화장품/미용기기, 기타]
export const beautyCategory = {
  BEAUTY_CARE: 1,
  BEAUTY_COSMETIC: 2,
  BEAUTY_ETC: 3,
} as const

export type BeautyCategory = typeof beautyCategory[keyof typeof beautyCategory]

// 광고주 카테고리 식품, 음료
// [다이어트식품, 남성식품, 여성식품, 공용식품, 기타]
export const foodCategory = {
  FOOD_DIET: 1,
  FOOD_MAN: 2,
  FOOD_WOMAN: 3,
  FOOD_ALL: 4,
  FOOD_ETC: 5,
} as const

export type FoodCategory = typeof foodCategory[keyof typeof foodCategory]

// 광고주 카테고리 전자/가전
// [주방/생활 가전, 기타]
export const homeCategory = {
  HOME_APPLIANCE: 1,
  HOME_ETC: 2,
} as const

export type HomeCategory = typeof homeCategory[keyof typeof homeCategory]

// 광고주 카테고리 의류, 패션
// [의류/패션잡화, 명품 브랜드, 스포츠/아웃도어, 기타]
export const fashionCategory = {
  FASHION_CLOTH: 1,
  FASHION_BRAND: 2,
  FASHION_SPORT: 3,
  FASHION_ETC: 4,
} as const

export type FashionCategory = typeof fashionCategory[keyof typeof fashionCategory]

// 광고주 카테고리 자동차, 수송
// [렌터카/카쉐어링, 자동차 용품/서비스, 기타]
export const carCategory = {
  CAR_RENT: 1,
  CAR_SERVICE: 2,
  CAR_ETC: 3,
} as const

export type CarCategory = typeof carCategory[keyof typeof carCategory]

// 광고주 카테고리 비즈니스, 전문서비스
// [법률서비스, 기타]
export const businessCategory = {
  BUSINESS_LAW: 1,
  BUSINESS_ETC: 2,
} as const

export type BusinessCategory = typeof businessCategory[keyof typeof businessCategory]

// 광고주 카테고리 교육, 취업
// [강의/자격증/평생교육, 기타]
export const educationCategory = {
  EDU_CLASS: 1,
  EDU_ETC: 2,
} as const

export type EducationCategory = typeof educationCategory[keyof typeof educationCategory]

// 광고주 카테고리 금융
// [증권, 기타]
export const financeCategory = {
  FINANCE_STOCK: 1,
  FINANCE_ETC: 2,
} as const

export type FinanceCategory = typeof financeCategory[keyof typeof financeCategory]

// 광고주 카테고리 엔터테인먼트
// [공연/전시, 기타]
export const entertainCategory = {
  ENT_SHOW: 1,
  ENT_ETC: 2,
} as const

export type EntertainCategory = typeof entertainCategory[keyof typeof entertainCategory]

// 광고주 카테고리
export const category = {
  MEDICAL: medicalCategory,
  BEAUTY: beautyCategory,
  FOOD: foodCategory,
  HOME: homeCategory,
  FASHION: fashionCategory,
  CAR: carCategory,
  BUSINESS: businessCategory,
  EDUCATION: educationCategory,
  FINANCE: financeCategory,
  ENTERTAIN: entertainCategory,
  SERVICE_AD: 11,
  SERVICE_TM: 12,
  SERVICE_PROGRESS: 13,
  SERVICE_LIVE: 14,
  SERVICE_END: 15,
} as const

export type Category = typeof category[keyof typeof category]
