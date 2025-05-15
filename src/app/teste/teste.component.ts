import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-teste',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teste.component.html',
})
export class TesteComponent {
  excelData: any[][] = [];
  headers: string[] = [];

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();


    reader.onload = (e: ProgressEvent<FileReader>) => {
      const bstr = e.target?.result as string;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

      this.headers = data[0];
      this.excelData = data.slice(1);
    };

    reader.readAsBinaryString(file);
  }

  isImageUrl(value: string): boolean {
    return (
      typeof value === 'string' &&
      (value.startsWith('http') || value.startsWith('data:image'))
    );
  }
}
