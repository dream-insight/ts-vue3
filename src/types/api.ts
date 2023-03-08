// API 전송시 interface 후미 구분으로 GET, POST 구분
// Params => get method, Post => post method
import { StringIndex } from './common'

export const enumYN = {
  Y: 'Y',
  N: 'N'
} as const

export type EnumYN = typeof enumYN[keyof typeof enumYN]

export const enumSmartPage = {
  LAYOUT: 'layout',
  FOOTER: 'footer',
  FORM: 'form',
  AGREE: 'agree',
  HTML: 'html'
} as const

export type EnumSmartPage = typeof enumSmartPage[keyof typeof enumSmartPage]

export const adminLev = {
  DEFAULT: '',
  SU: 'SU',
  AM: 'AM',
  MG: 'MG',
  TM: 'TM',
  CS: 'CS',
  MD: 'MD'
} as const

export type AdminLev = typeof adminLev[keyof typeof adminLev]

export const inputConfigType = {
  NAME: 'name',
  TEL: 'tel',
  AGE: 'age',
  GENDER: 'gender',
  CERT: 'cert',
  THIRDPART: 'third-part-yn',
  SMS: 'sms-yn',
  INPUT: 'input',
  TEXTAREA: 'textarea',
  RADIO: 'radio',
  SELECT: 'select',
  CHECKBOX: 'checkbox'
} as const

export type InputConfigType = typeof inputConfigType[keyof typeof inputConfigType]

// special rename
export type Result = string
export type JsonString = string
export type DatetimeString = string
export type DateString = string

export interface PublicCode {
  text: string
  value: string
}

export interface PublicCodeName {
  [index: string]: StringIndex<string>
}

export interface PublicCodeSet {
  code: PublicCode
  code_name: PublicCodeName
}

export interface PublicCodeResult {
  codes: PublicCodeSet
}

export interface FormDataItem {
  [index: string]: any
}

export interface OnlyResult {
  result: Result
}

// category json type
export interface CodeData {
  code: string,
  codeName: string,
  codeType: string,
  depth: number,
  matchingText: string | null,
  parent: string
  sorting: number
}

export interface CodeFullTree extends CodeData {
  sub: CodeData[]
}

export interface LoginPost {
  adm_id: string
  pwd: string
}

export interface LoginData {
  adm_idx: number
  adm_name: string
  lev: AdminLev
}

export interface LoginResult {
  result: Result
  data: LoginData
}

// ================================================ Client ================================================
export interface ClientListParams {
  page: number
  page_size: number
  srch_target: string
  srch_text: string
}

export interface ClientListItem {
  cc_idx: number,
  company_name: string
  company_code: string
  charge_name: string
  start_date: string
  end_date: DateString
  reg_date: DatetimeString
  admaker_yn: EnumYN
  use_yn: EnumYN
  cate_name: string
  cate_name2?: string
  domain: string
  cateName?: string
}

export interface ClientListResult {
  result: Result
  total_count: number
  data: ClientListItem[]
}

export interface ClientDataPost {
  cc_idx: number
  cate_code: string
  company_name: string
  company_code: string
  domain: string
  charge_name: string
  charge_tel: string
  charge_email: string
  start_date: DateString
  end_date: DateString
  use_yn: EnumYN
  admaker_yn: EnumYN
  ftp: string
  ftp_id: string
  ftp_pwd: string
  image_url: string
  ftp_comment: string
  account: string
  keyword: string
  age: string
  gender: string
}

export interface ClientDataParams {
  cc_idx: number
}

export interface ClientDataItems {
  cc_idx: number,
  company_name: string
  company_code: string
  domain: string
  charge_name: string
  charge_tel: string
  charge_email: string
  start_date: string
  end_date: string
  db_cnt: number
  use_yn: EnumYN
  admaker_yn: EnumYN
  edit_date: DatetimeString
  reg_date: DatetimeString
  cate_code: string
}

export interface ClientFtpItems {
  ftp: string
  ftp_id: string
  ftp_pwd: string
  ftp_comment: string
  image_url: string
}

export interface ClientAddItems {
  account: string
  keyword: string
  gender: string
  age: string
}

export interface ClientData {
  result: Result,
  data: ClientDataItems,
  config: ClientFtpItems,
  add: ClientAddItems
}

export interface CodeParams {
  codeType: string
}

export interface ClientCodeDupleParams {
  code: string
}

// 광고주 계정 코드 정보
export interface ClientCode {
  company_name: string
  company_code: string
}

export interface ClientCodeResult {
  result: Result
  data: ClientCode[]
}


// ================================================ Server ================================================
// 테이블 목록
export interface DbTableListItem {
  TABLE_CATALOG: string
  TABLE_SCHEMA: string
  TABLE_NAME: string
  TABLE_TYPE: string
  ENGINE: string
  VERSION: string
  ROW_FORMAT: string
  TABLE_ROWS: number
  AVG_ROW_LENGTH: number
  DATA_LENGTH: number
  MAX_DATA_LENGTH: number
  INDEX_LENGTH: number
  DATA_FREE: number
  AUTO_INCREMENT: number
  CREATE_TIME: DatetimeString
  UPDATE_TIME: DatetimeString
  CHECK_TIME: string
  TABLE_COLLATION: string
  CHECKSUM: string
  CREATE_OPTIONS: string
  TABLE_COMMENT: string
  MAX_INDEX_LENGTH: number
  TEMPORARY: string
  color?: string
}

export interface DbTableListResult {
  result: Result
  data: DbTableListItem[]
}

// 테이블 컬럼 정보 호출 파라미터
export interface DbTableColumnsParams {
  table: string
}

// 테이블 컬럼 정보 목록
export interface DbTableColumnsItem {
  TABLE_CATALOG?: string
  TABLE_SCHEMA?: string
  TABLE_NAME?: string
  COLUMN_NAME: string
  ORDINAL_POSITION?: number
  COLUMN_DEFAULT: string
  IS_NULLABLE: string
  DATA_TYPE?: string
  CHARACTER_MAXIMUM_LENGTH?: string
  CHARACTER_OCTET_LENGTH?: string
  NUMERIC_PRECISION?: number
  NUMERIC_SCALE?: number
  DATETIME_PRECISION?: DatetimeString
  CHARACTER_SET_NAME?: string
  COLLATION_NAME?: string
  COLUMN_TYPE: string
  COLUMN_KEY?: string
  EXTRA?: string
  PRIVILEGES?: string
  COLUMN_COMMENT: string
  IS_GENERATED?: string
  GENERATION_EXPRESSION?: string
  OLD_COLUMN?: string
  action?: string
}

export interface DbTableColumnsResult {
  result: Result
  data: DbTableColumnsItem[]
}

// 테이블 컬럼 추가, 수정
export interface DbAlterTablePost {
  OLD_COLUMN?: string
  COLUMN_NAME: string
  COLUMN_TYPE: string
  IS_NULLABLE: string
  COLUMN_DEFAULT: string
  COLUMN_COMMENT: string
  table: string
  before: string
  action?: string
}

// DB 조작 에러
export interface ErrorResult {
  code: string
  message: string
}

// alter table 처리 결과 값
export interface AlterTableResult {
  result: Result,
  changed: number,
  error: ErrorResult[]
}

// drop column
export interface DropColumnPost {
  table: string
  column: string
}

// drop column 결과 값
export interface DropColumnResult {
  result: Result
  changed: number
  error: ErrorResult[]
}

// 쿼리 실행
export interface QueryExecutePost {
  database: string
  query: string
  default: string
}

// 쿼리 실행 결과 값
export interface QueryExecuteResult {
  result: Result
  executed: number
  error: ErrorResult[]
}

export interface TableCapacityListParams {
  db: string
}

export interface TableCapacityListItem {
  TABLE_NAME: string
  TABLE_ROWS: number
  DATA_LENGTH: string
  INDEX_LENGTH: string
  UPDATE_TIME: DatetimeString
}

export interface TableCapacityListResult {
  result: Result
  data: TableCapacityListItem[]
}

export interface DatabaseCapacityItem {
  Server: string
  cnt: number
  capacity: string
  company_name: string
}

export interface DatabaseCapacityResult {
  result: Result
  data: DatabaseCapacityItem[]
}

export interface ServerLogFilesParams {
  name?: string
  type?: string
}

export interface ServerLogFilesItem {
  name: string
  path: string
  size: string
  type: string
  typeName: string
}

export interface ServerLogFilesResult {
  result: Result,
  data: ServerLogFilesItem[]
}

export interface ServerLogDataParams {
  name: string
  path: string
  page: number
  page_size: number
  start_time?: string
  end_time?: string
}

export interface ServerLogDataResult {
  result: Result
  data: string[]
}

// ================================================ System ================================================
export interface MenuItem {
  title: string
  icon: string
  path: string
  active: boolean
  deleted: boolean
  idx: number
  use_yn: EnumYN
}

export interface MenuSubItem {
  title: string
  path: string
  active: boolean
  deleted: boolean
  idx: number
  use_yn: EnumYN
}

export interface TotalMenuItem extends MenuItem {
  sub: MenuSubItem[]
}

export interface TotalMenuResult {
  result: Result
  menus: TotalMenuItem[]
}

export interface MenuJsonPost {
  menus: JsonString
}


// ================================================ Smart ================================================
export interface SmartListParams {
  page: number
  page_size: number
  type: EnumSmartPage
}

export interface SmartListItem {
  idx: number
  name: string
  code: string
  date: DatetimeString
  agree_code: string
}

export interface SmartListResult {
  result: Result
  total_count: number
  data: SmartListItem[]
}

export interface SmartDataRemovePost {
  type: EnumSmartPage
  idx: number
}

export interface SmartDataParams {
  type: EnumSmartPage
  idx: number
}

export interface SmartDataItem {
  code: string
  name: string
  html: string
  agree_code?: string
}

export interface SmartDataResult {
  result: Result
  data: SmartDataItem
}

export interface SmartDataPost {
  type: EnumSmartPage
  mode: string
  idx: number
  name: string
  code: string
  html: string
  agree_code?: string
}

export interface SmartAgreeSimpleItem {
  label: string
  value: string
  idx: number
}

export interface SmartAgreeSimpleResult {
  result: Result
  data: SmartAgreeSimpleItem[]
}

// ================================================ Data API ================================================
export interface DefaultMemberListParams {
  page: number
  page_size: number
  srch_target?: string
  srch_text?: string
}

export interface DefaultMemberItem {
  mb_idx: number
  mb_name: string
  mb_id: string
  use_yn: EnumYN
}

export interface DefaultMemberListResult {
  result: Result
  data: DefaultMemberItem[]
  total_count: number
}

export interface DefaultMemberChangeStatePost {
  mb_id: string
  use_yn: EnumYN
}

export interface DefaultMemberChangeStateResult {
  result: Result
  fail: string[]
}

export interface DefaultMemberData {
  mb_id: string
  mb_name: string
  use_yn: EnumYN
}

export interface DefaultMemberDataParams {
  mb_idx: number
}

export interface DefaultMemberDataResult {
  result: Result
  data: DefaultMemberData
}

export interface DefaultMemberDataPost {
  mb_idx?: number
  mb_id: string
  pwd: string
  mb_name: string
  use_yn: EnumYN
}

export interface DefaultMemberDataPostResult {
  result: Result
  fail: string[]
}

export interface DefaultMemberIdDuplicateParams {
  mb_id: string
}

export interface LevMenuItemParams {
  lev: AdminLev
}

export interface LevMenuPost extends MenuJsonPost {
  lev: AdminLev
}

export interface CounselStatusDataParams {
  code: string
}

export interface CounselStatusData {
  code_name: string
  bg_color: string
  use_yn: EnumYN
}

export interface CounselStatusDataResult {
  result: Result
  data: CounselStatusData
}

export interface CounselStatusDataPost {
  code: string
  code_name: string
  bg_color: string
  use_yn: EnumYN
}

export interface CounselStatusItem extends CounselStatusData {
  idx: number
  code: string
}

export interface CounselStatusListResult {
  result: Result
  data: CounselStatusItem[]
}

export interface InputConfigItem {
  ic_idx: number
  input_label: string
  input_type: InputConfigType
  input_value: string
  change_code: string
  validate_yn: EnumYN
  reg_date: string,
}
export interface InputConfigItemList {
  idx: number
  label: string
  type: InputConfigType
  value: string
  changeCode: string
  validate: EnumYN
  codeType: string
  db: boolean
}


export interface InputConfigItemResult {
  result: Result
  data: InputConfigItem[]
}

export interface InputConfigPost {
  mb_id: string
  json: JsonString
}

export interface InputConfigRemovePost {
  mb_id: string
  ic_idx: number
}

// ================================================ Report API ================================================
export interface ReportCodeParams {
  codeType: string
}

export interface ReportCode {
  result: Result,
  data: CodeFullTree[]
}

export interface ReportCodePost {
  code: string
  codeName: string
  codeType: string
  depth: number
  parent: string
  matchingText?: string
}

export interface ReportCodePostResult {
  result: Result
  code: number
}

export interface ReportCodeSortChangePost {
  codes: JsonString
}

export interface API {
  setMessage(msg: string): void
  setSpinnerTimeout(time: number): void
  login(form: LoginPost): Promise<LoginResult>
  getCode(): Promise<PublicCodeResult>
  getClientCodeDuple(params: ClientCodeDupleParams): Promise<OnlyResult>
  setClientData(form: ClientDataPost): Promise<OnlyResult>
  getClientList(params: ClientListParams): Promise<ClientListResult>
  getClientData(params: ClientDataParams): Promise<ClientData>
  getClientCode(): Promise<ClientCodeResult>
  getTableList(): Promise<DbTableListResult>
  getTableColumns(params: DbTableColumnsParams): Promise<DbTableColumnsResult>
  setAlterTable(form: DbAlterTablePost): Promise<OnlyResult>
  setDropColumn(form: DropColumnPost): Promise<OnlyResult>
  setQueryExecute(form: QueryExecutePost): Promise<QueryExecuteResult>
  getTableCapacity(params: TableCapacityListParams): Promise<TableCapacityListResult>
  getDatabaseCapcity(): Promise<DatabaseCapacityResult>
  getServerLogFiles(params: ServerLogFilesParams): Promise<ServerLogFilesResult>
  getServerLogData(params: ServerLogDataParams): Promise<ServerLogDataResult>
  getTotalMenus(): Promise<TotalMenuResult>
  setMenus(form: MenuJsonPost): Promise<OnlyResult>
  setApacheGraceful(): Promise<OnlyResult>
  getSmartItemList(params: SmartListParams): Promise<SmartListResult>
  setSmartItemRemove(form: SmartDataRemovePost): Promise<OnlyResult>
  getSmartItemData(params: SmartDataParams): Promise<SmartDataResult>
  setSmartItemRegist(form: SmartDataPost): Promise<OnlyResult>
  getAgreeSimpleList(): Promise<SmartAgreeSimpleResult>
  getDefaultMemberList(params: DefaultMemberListParams): Promise<DefaultMemberListResult>
  setDefaultMemberChangeState(form: DefaultMemberChangeStatePost): Promise<DefaultMemberChangeStateResult>
  getDefaultMemberData(params: DefaultMemberDataParams): Promise<DefaultMemberDataResult>
  setDefaultMember(form: DefaultMemberDataPost): Promise<DefaultMemberDataPostResult>
  getIdDuplicate(params: DefaultMemberIdDuplicateParams): Promise<OnlyResult>
  getMenus(params: LevMenuItemParams): Promise<TotalMenuResult>
  setLevMenu(form: LevMenuPost): Promise<OnlyResult>
  getCounselStatusList(): Promise<CounselStatusListResult>
  getCounselStatus(parms: CounselStatusDataParams): Promise<CounselStatusDataResult>
  setCounselStatus(form: CounselStatusDataPost): Promise<OnlyResult>
  getInputConfig(): Promise<InputConfigItemResult>
  setInputConfig(form: InputConfigPost): Promise<OnlyResult>
  setRemoveInputConfig(form: InputConfigRemovePost): Promise<OnlyResult>
  getReportCode(params: ReportCodeParams): Promise<ReportCode>
  setReportCode(form: ReportCodePost): Promise<ReportCodePostResult>
  setReportChangeSort(form: ReportCodeSortChangePost): Promise<OnlyResult>
}