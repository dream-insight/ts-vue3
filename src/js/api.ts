import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type {
  API,
  FormDataItem,
  LoginPost,
  ClientCodeDupleParams,
  ClientData,
  ClientDataPost,
  ClientListParams,
  ClientDataParams,
  DbTableColumnsParams,
  DbAlterTablePost,
  DropColumnPost,
  QueryExecutePost,
  QueryExecuteResult,
  TableCapacityListParams,
  TableCapacityListResult,
  ServerLogFilesParams,
  ServerLogDataParams,
  MenuJsonPost,
  SmartListParams,
  SmartDataRemovePost,
  SmartDataParams,
  SmartDataPost,
  DefaultMemberListParams,
  DefaultMemberChangeStatePost,
  DefaultMemberDataParams,
  DefaultMemberDataPost,
  DefaultMemberIdDuplicateParams,
  LevMenuItemParams,
  LevMenuPost,
  CounselStatusDataParams,
  CounselStatusDataPost,
  InputConfigPost,
  InputConfigRemovePost,
  ReportCodeParams,
  ReportCodePost,
  ReportCodeSortChangePost,
  LoginResult,
  OnlyResult,
  ClientListResult,
  ClientCodeResult,
  DbTableListResult,
  DbTableColumnsResult,
  DatabaseCapacityResult,
  ServerLogFilesResult,
  ServerLogDataResult,
  TotalMenuResult,
  SmartListResult,
  SmartDataResult,
  SmartAgreeSimpleResult,
  DefaultMemberListResult,
  DefaultMemberChangeStateResult,
  DefaultMemberDataResult,
  DefaultMemberDataPostResult,
  CounselStatusListResult,
  CounselStatusDataResult,
  InputConfigItemResult,
  ReportCode,
  ReportCodePostResult,
  PublicCodeResult,
} from '@/types/api'
import { spinner } from '@/components/Spinner/index'

const Spinner = new spinner()

class api implements API {
  private http: AxiosInstance
  private SpinnerTimeout: number = 10 * 10000
  private message: string
  private reportUrl: string

  constructor() {
    this.message = 'Loading...'
    this.reportUrl = process.env.VUE_APP_REPORT_API_URL

    this.http = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      timeout: 60000,
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/x-www-form-urlencoded charset=UTF-8',
      },
    })
  }

  // Spinner 메시지 출력 설정
  public setMessage(msg: string): void {
    this.message = msg
  }

  // Spinner 최대 표시 기간 설정
  public setSpinnerTimeout(time: number): void {
    this.SpinnerTimeout = time
  }

  // 데이터 호출 API
  private getAPI(url: string, params?: any, load: boolean = true): Promise<any> {
    if (load) {
      Spinner.delay(1000).show(this.message)
    }

    return this.http.get(url, { params })
      .then((res) => {
        if (load) {
          Spinner.hide()
        }

        return res.data
      }).catch(err => {
        this.showError(err, url)
      })
  }

  // 데이터 전송 API
  private postAPI(url: string, form?: any, headers = {}): Promise<any> {
    Spinner.delay(1000).show(this.message)

    return this.http.post(url, this.getFormData(form), { headers })
      .then(res => {
        Spinner.hide()
        return res.data
      }).catch(err => {
        this.showError(err, url)
      })
  }

  private getFormData(obj?: FormDataItem): FormData | null {
    if (obj) {
      let data = new FormData()

      if (typeof obj === 'object') {
        Object.entries(obj).forEach(([key, value]) => {
          data.append(key, value)
        })
      }

      return data
    }

    return null
  }

  // 오류 확인
  private showError(error: any, url: string): void {
    console.error('error url: ', url)

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('response data: ', error.response.data);
      console.error('response status: ', error.response.status);
      console.error('response header: ', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('request error: ', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('etc error:', error.message);
    }

    console.error('axios config:', error.config);
  }

  public login(form: LoginPost): Promise<LoginResult> {
    return this.postAPI('/admin/login', form)
  }

  public getCode(): Promise<PublicCodeResult> {
    return this.getAPI('/system/get_code')
  }

  public getClientCodeDuple(params: ClientCodeDupleParams): Promise<OnlyResult> {
    return this.getAPI('/client/get_client_code_duple', params, false)
  }

  public setClientData(form: ClientDataPost): Promise<OnlyResult> {
    return this.postAPI('/client/set_client_data', form)
  }

  public getClientList(params: ClientListParams): Promise<ClientListResult> {
    return this.getAPI('/client/get_client_list', params)
  }

  public getClientData(params: ClientDataParams): Promise<ClientData> {
    return this.getAPI('/client/get_client_data', params)
  }

  public getClientCode(): Promise<ClientCodeResult> {
    return this.getAPI('/client/get_client_code')
  }

  public getTableList(): Promise<DbTableListResult> {
    return this.getAPI('/server/get_table_list')
  }

  public getTableColumns(params: DbTableColumnsParams): Promise<DbTableColumnsResult> {
    return this.getAPI('/server/get_table_columns', params)
  }

  public setAlterTable(form: DbAlterTablePost): Promise<OnlyResult> {
    return this.postAPI('/server/set_alter_table', form)
  }

  public setDropColumn(form: DropColumnPost): Promise<OnlyResult> {
    return this.postAPI('/server/set_drop_column', form)
  }

  public setQueryExecute(form: QueryExecutePost): Promise<QueryExecuteResult> {
    return this.postAPI('/server/set_query_execute', form)
  }

  public getTableCapacity(params: TableCapacityListParams): Promise<TableCapacityListResult> {
    return this.getAPI('/server/get_tables', params)
  }

  public getDatabaseCapcity(): Promise<DatabaseCapacityResult> {
    return this.getAPI('/server/get_database_capcity')
  }

  public getServerLogFiles(params: ServerLogFilesParams): Promise<ServerLogFilesResult> {
    return this.getAPI('/server/get_server_log_files', params)
  }

  public getServerLogData(params: ServerLogDataParams): Promise<ServerLogDataResult> {
    return this.getAPI('/server/get_server_log_data', params)
  }

  public getTotalMenus(): Promise<TotalMenuResult> {
    return this.getAPI('/system/get_total_menus')
  }

  public setMenus(form: MenuJsonPost): Promise<OnlyResult> {
    return this.postAPI('/system/set_menus', form)
  }

  public setApacheGraceful(): Promise<OnlyResult> {
    return this.postAPI('/system/apache_graceful')
  }

  public getSmartItemList(params: SmartListParams): Promise<SmartListResult> {
    return this.getAPI('/smart/get_smart_item_list', params)
  }

  public setSmartItemRemove(form: SmartDataRemovePost): Promise<OnlyResult> {
    return this.postAPI('/smart/set_smart_item_remove', form)
  }

  public getSmartItemData(params: SmartDataParams): Promise<SmartDataResult> {
    return this.getAPI('/smart/get_smart_item_data', params)
  }

  public setSmartItemRegist(form: SmartDataPost): Promise<OnlyResult> {
    return this.postAPI('/smart/set_smart_item_regist', form)
  }

  public getAgreeSimpleList(): Promise<SmartAgreeSimpleResult> {
    return this.getAPI('/smart/get_agree_simple_list')
  }

  public getDefaultMemberList(params: DefaultMemberListParams): Promise<DefaultMemberListResult> {
    return this.getAPI('/data/get_default_member_list', params)
  }

  public setDefaultMemberChangeState(form: DefaultMemberChangeStatePost): Promise<DefaultMemberChangeStateResult> {
    return this.postAPI('/data/set_default_member_change_state', form)
  }

  public getDefaultMemberData(params: DefaultMemberDataParams): Promise<DefaultMemberDataResult> {
    return this.getAPI('/data/get_default_member', params)
  }

  public setDefaultMember(form: DefaultMemberDataPost): Promise<DefaultMemberDataPostResult> {
    return this.postAPI('/data/set_default_member', form)
  }

  public getIdDuplicate(params: DefaultMemberIdDuplicateParams): Promise<OnlyResult> {
    return this.getAPI('/data/get_default_member_duplicate', params)
  }

  public getMenus(params: LevMenuItemParams): Promise<TotalMenuResult> {
    return this.getAPI('/data/get_menus', params)
  }

  public setLevMenu(form: LevMenuPost): Promise<OnlyResult> {
    return this.postAPI('/data/set_lev_menus', form)
  }

  public getCounselStatusList(): Promise<CounselStatusListResult>  {
    return this.getAPI('/data/get_counsel_status_list')
  }

  public getCounselStatus(params: CounselStatusDataParams): Promise<CounselStatusDataResult> {
    return this.getAPI('/data/get_counsel_status', params)
  }

  public setCounselStatus(form: CounselStatusDataPost): Promise<OnlyResult> {
    return this.postAPI('/data/set_counsel_status', form)
  }

  public getInputConfig(): Promise<InputConfigItemResult> {
    return this.getAPI('/data/get_input_config')
  }

  public setInputConfig(form: InputConfigPost): Promise<OnlyResult> {
    return this.postAPI('/data/set_input_config', form)
  }

  public setRemoveInputConfig(form: InputConfigRemovePost): Promise<OnlyResult> {
    return this.postAPI('/data/set_remove_input_config', form)
  }

  // report api
  public getReportCode(params: ReportCodeParams): Promise<ReportCode> {
    return this.getAPI(`${this.reportUrl}/common/getCode`, params)
  }

  public setReportCode(form: ReportCodePost): Promise<ReportCodePostResult> {
    return this.postAPI(`${this.reportUrl}/common/setCode`, form)
  }

  public setReportChangeSort(form: ReportCodeSortChangePost): Promise<OnlyResult> {
    return this.postAPI(`${this.reportUrl}/common/setChangeSorting`, form)
  }
}

export const useAPI = (): API => {
  return new api()
}