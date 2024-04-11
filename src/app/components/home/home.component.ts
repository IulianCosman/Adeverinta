import {Component, OnInit} from '@angular/core';
import {DocxService} from "../../services/docx.service";
import {Packer} from "docx";
import {saveAs} from "file-saver";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;
  generatedDocUrl: string | undefined;
  constructor(private usersService : UsersService) {}
  public download(firstName: string | undefined, lastName: string | undefined, phone: string | undefined, email: string | undefined, address: string | undefined, university: string | undefined): void {
    const documentCreator = new DocxService();
    const doc = documentCreator.create(firstName, lastName, email, phone, address, university);

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "Doctor's Note.docx");
      console.log("Document created successfully");
    })
  };
  ngOnInit(): void {
  }

}
