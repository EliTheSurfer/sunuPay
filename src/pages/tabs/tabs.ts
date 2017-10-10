import { Component } from '@angular/core';

import { ChatsPage } from '../chats/chats';
import { ProfilePage } from '../profile/profile';
import { JobsPage } from '../jobs/jobs';
import { MyJobsPage } from '../myjobs/myjobs';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = JobsPage;
  tab2Root = ChatsPage;
  tab3Root = ProfilePage;
  tab4Root = MyJobsPage;

  constructor() {

  }
}
