import { Component, OnInit } from '@angular/core';

import { Moments } from 'src/app/Moments';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  btnText = 'Compartilhar!'

  constructor(private momentService: MomentService, private messageService: MessagesService, private router: Router) {}

  ngOnInit(): void { }

  async createHandler(moment: Moments) {
    const formData = new FormData()

    formData.append('title', moment.title)
    formData.append('description', moment.description)

    if (moment.image) {
      formData.append('image', moment.image)

       await this.momentService.createMoment(formData).subscribe()

       this.messageService.add('Moment inserido com sucesso')

       this.router.navigate(['/'])

    }
  }

}
