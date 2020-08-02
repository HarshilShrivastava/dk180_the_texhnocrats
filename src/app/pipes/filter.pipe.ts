import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
      return items.filter((it) => {
        if(it.job_name)
          return it.job_name.toLowerCase().includes(searchText) || it.job_company.toLowerCase().includes(searchText);
        else
          return it.Title.toLowerCase().includes(searchText);
      });
    }
}
