import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PdfResponse } from "../models/PdfResponse";
import { PdfInfo } from "../models/PdfInfo";

@Injectable({ providedIn: "root" })
export class ApiPdfRequestService {
    private baseUrl = "";

    constructor(private http: HttpClient) {}

    getPdfById(id: string): Observable<PdfResponse> {
        return this.http.get<PdfResponse>(`${this.baseUrl}api/pdf/baixar-pdf?id=${id}`);
    }

    getItemsInFolder(folderId: string): Observable<PdfInfo[]> {
        const a = this.http.get<PdfInfo[]>(`${this.baseUrl}api/pdf/listar-pdfs?id=${folderId}`);
        console.log(a);
        return a;
    }
}