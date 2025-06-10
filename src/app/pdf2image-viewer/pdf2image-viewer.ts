import { Component, OnInit, HostListener } from "@angular/core";
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from "pdfjs-dist";
import { PDFPageProxy } from "pdfjs-dist/types/src/display/api";

@Component({
  selector: "app-pdf2image-viewer",
  imports: [],
  templateUrl: "./pdf2image-viewer.html",
  styleUrl: "./pdf2image-viewer.css"
})
export class Pdf2imageViewer implements OnInit {
    ngOnInit(): void {
        GlobalWorkerOptions.workerSrc = "assets/pdf-js/pdf.worker.min.mjs";
        this.renderPDF("assets/armando-pinto.pdf");
    }

	@HostListener("document:visibilitychange")
	onVisibilityChange(): void {
		if (document.hidden) {
			const container: HTMLElement | null = document.getElementById("img-presenter");
			if (container) container.innerHTML = "";
		}
  	}

	private renderPDF(pdfPath: string): void {
		const container: HTMLElement | null = document.getElementById("img-presenter");
		if (!container) return;

		getDocument(pdfPath).promise.then((pdf: PDFDocumentProxy) => {
			for (let i = 1; i <= pdf.numPages; i++) {
				pdf.getPage(i).then((page: PDFPageProxy) => {
					const viewport = page.getViewport({ scale: 1.5 });
					const canvas: HTMLCanvasElement = document.createElement("canvas");
					canvas.width = viewport.width;
					canvas.height = viewport.height;
					const ctx = canvas.getContext("2d");

					if (!ctx) return;

					page.render({ canvasContext: ctx, viewport }).promise.then(() => {
						this.addWatermark(ctx);
						const img = new Image();
						img.src = canvas.toDataURL();
						container.appendChild(img);
					});
				});
			}
		})
		.catch((error: any) => {
			console.error("Erro ao carregar o PDF:", error);
		});
	}

	private getCurrentDateTime(): string {
		const now = new Date();
		return (
			now.toLocaleDateString("pt-BR") 
			+ " " + 
			now.toLocaleTimeString("pt-BR", {hour: "2-digit", minute:"2-digit"})
		);
	}

	private addWatermark(ctx: CanvasRenderingContext2D) {
		ctx.font = "20px Arial";

		const text = `TC - ${this.getCurrentDateTime()}`;
		const size = 150;

		for (let y = 0; y < 10; y++) {
			for (let x = 0; x < 10; x++) {
				if ((x + y) % 2 === 0) {
					ctx.save();
					ctx.translate(x*size + 2, y*size + 8);
					ctx.rotate(45 * Math.PI / 180);
					ctx.fillStyle = "rgba(120,120,120,0.4)";
					ctx.fillText(text, 0, 0);
					ctx.restore();
				}
			}
		}
	}
}
