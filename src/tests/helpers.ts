import { throwError } from 'rxjs';

export const spy = <T>(what: any, method: string, result: any, needPromise = true) => {
    jest.spyOn(what, method).mockImplementationOnce(() => {
        return needPromise ? Promise.resolve(result) : result;
    });
}

export const spyException = <T>(what: any, method: string, Exception: any, needPromise = true) => {
    if (needPromise) jest.spyOn(what, method).mockRejectedValueOnce(() => new Exception());
    else jest.spyOn(what, method).mockImplementation(() => new Exception());
}
