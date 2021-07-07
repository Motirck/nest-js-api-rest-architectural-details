import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NestResponse } from "./nest-response";

@Injectable()
export class ResponseTranformer implements NestInterceptor {
    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(
                map((responseController: NestResponse) => {
                    if (responseController instanceof NestResponse) {
                        const contextApplication = context.switchToHttp();
                        const response = contextApplication.getResponse();
                        const { headers, status, body } = responseController;

                        // Create an array with all header attributes
                        const headersNames = Object.getOwnPropertyNames(headers);

                        headersNames.forEach(item => {
                            const headerValue = headers[item];
                            this.httpAdapter.setHeader(response, item, headerValue)
                        });

                        this.httpAdapter.status(response, status);

                        return body;
                    }

                    return responseController;
                })
            )
    }

}