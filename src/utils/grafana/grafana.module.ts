export module GrafanaHelper {
    /**
     * Possible result statuses for testDatasource
     */
    export enum ReturnStatus {
        success = "success",
        error = "error",
    }

    /**
     * Helper class to generate the right json object to pass over to grafana.
     * It handles success and error object messages.
     */
    export class Response {
        retObj = {}

        /**
         * Generates error json message
         * @param title Message title 
         * @param msg Message body
         */
        static error(title: String, msg: String) {
            return {
                status: ReturnStatus.error,
                title: title,
                message: msg
            }
        }

        /**
         * Generates success json messages
         * @param title Message title 
         * @param msg Message body
         */
        static success(title: String, msg: String) {
            return {
                status: ReturnStatus.success,
                title: title,
                message: msg
            }
        }
    }

    export class Metric {
        text: string
        value: any
        /**
         *
         */
        constructor(text:string,value:any) {
            this.text=text;
            this.value=value;            
        }
    }
}