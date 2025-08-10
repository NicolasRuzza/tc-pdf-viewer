import { Routes } from "@angular/router";
import { Pdf2ImageViewer } from "./pdf2image-viewer/pdf2image-viewer";

export const routes: Routes = [
    {
        path: "visualizar/:type/:id",
        component: Pdf2ImageViewer
    }
];