import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CompletionApi } from '@beeker-tech/genius-client';

@Injectable()
export class CompletionApiImpl extends CompletionApi {
  constructor(http: HttpService) {
    super(http.axiosRef);
  }
}
