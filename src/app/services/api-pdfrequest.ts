import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface PdfResponse {
    content: string;
    mimeType: string;
    encoding: string;
    filename: string;
}

@Injectable({ providedIn: "root" })
export class ApiPdfRequestService {
    private baseUrl = "http://localhost:3000/";

    constructor(private http: HttpClient) {}

    getPdfById(id: string): Observable<PdfResponse> {
        const a = this.http.get<PdfResponse>(`${this.baseUrl}api/pdf/baixar?id=${id}`);
        console.log(a);
        return a;
    }
}