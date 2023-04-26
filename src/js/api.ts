import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type {
  API,
  FormDataItem,
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

}

export const useAPI = (): API => {
  return new api()
}