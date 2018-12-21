import { Injectable } from '@angular/core';
import { Observable, of, MonoTypeOperatorFunction, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoaderDirective } from '@app/directives/loader/loader.directive';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { takeUntil, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollsService {
  private username: string;
  constructor(private http: HttpClient) {}

  setUsername(value: string) {
    this.username = value;
  }

  submitPoll(submitForm: CreatePollForm): Observable<any> {
    return this.submitPollReq(submitForm);
  }
  private submitPollReq(submitForm: CreatePollForm): Observable<any> {
    return of<any[]>([]);
  }

  getPollDetails(pollId: string): Observable<PollDetails> {
    return this.getPollDetailsReq(pollId);
  }
  private getPollDetailsReq(pollId: string): Observable<PollDetails> {
    return of<PollDetails>({
      id: 'test',
      title: 'نظرسنجی تست',
      options: { o1: 3, o2: 0 },
      username: 'vahid',
      description: 'توضیحات نسین صثمن بمثنص تصمثنبت ثصم نتبصثمن تثصنمب ت',
      status: 1,
      final_option: 'o1'
    });
  }

  getPollsList(): Observable<PollDetails[]> {
    return this.getPollsListReq();
  }
  private getPollsListReq(): Observable<any> {
    return of<PollDetails[]>([
      {
        id: 'test',
        title: 'نظرسنجی تست',
        options: { o1: 3, o2: 0 },
        username: 'vahid',
        description: 'توضیحات نسین صثمن بمثنص تصمثنبت ثصم نتبصثمن تثصنمب ت',
        status: 1,
        final_option: 'o1'
      },
      {
        id: 'test',
        title: 'نظرسنجی تست',
        options: { o1222: 1, olgjwelwe: 2 },
        username: 'vahid',
        description: 'توضیحات نسین صثمن بمثنص تصمثنبت ثصم نتبصثمن تثصنمب ت',
        status: 0
      }
    ]);
  }
}

export interface PollDetails {
  id: string;
  username: string;
  title: string;
  description: string;
  status: number;
  options: { [option: string]: number };
  final_option?: string;
}

export interface CreatePollForm {
  username: string;
  title: string;
  description: string;
  options: string[];
  participants: string[];
}

export function reqPipe<T>(
  loader?: LoaderDirective | string,
  { enCatchError = true, preventParallel = false } = {}
): MonoTypeOperatorFunction<T> {
  if (preventParallel) {
    if (this.isLoaderActive(loader, true)) return;
  }
  setLoader(loader, true);

  return (source: AnonymousSubject<any>) => {
    return source.pipe(
      tap(data => {
        setLoader(loader, false);
      }),
      catchError(error => {
        if (enCatchError) {
          setLoader(loader, false);
          // this.errorHandler.shared(error);
        }
        return throwError(error);
      })
    );
  };
}

function setLoader(loader: string | LoaderDirective, value: boolean) {
  if (loader == undefined) return;
  if (typeof loader === 'string') {
    // timeout so that angular change detection counts it as a change
    setTimeout(() => (this[loader] = value), 0);
  } else if (typeof loader === 'object') {
    loader.is = value;
  }
}
