import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "applyfilter",
})
export class ApplyFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((it) => {
      return it.job_name.toLowerCase().includes(searchText) || it.job_company.toLowerCase().includes(searchText);
    });
  }
}
