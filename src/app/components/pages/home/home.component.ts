import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';
import { Moments } from 'src/app/Moments';
import { environment } from 'src/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allMoments: Moments[] = []
  moments: Moments[] = []
  baseApiUrl = environment.baseApiUrl

  faSearch = faSearch

  searchTerm: string = ''

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((item) => {

      const data = item.data

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleString('pt-BR')
      })

      this.allMoments = data
      this.moments = data

    })

  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement
    const value = target.value

    this.moments = this.allMoments.filter((moment) =>
      moment.title.toLowerCase().includes(value.toLowerCase())
    )

  }

}
