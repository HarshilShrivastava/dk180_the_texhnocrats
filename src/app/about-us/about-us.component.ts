import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.less"],
})
export class AboutUsComponent implements OnInit {
  constructor() {}
  sections = [
    {
      name: "Gaurav Joshi",
      desc:
        "A passionate web developer, ML and fitness enthusiast. Also a rider, pet-parent and a cook at times amongst many things. One thing I'm not is monotonous ",
      image: "./assets/image/team/gaurav.jpg",
      emoji: "./assets/image/team/gaurav_emoji.png",
    },
    {
      name: "Harsh",
      desc: "Front end developer and Data Science enthusiast ",
      image: "./assets/image/team/harsh.JPG",
      emoji: "./assets/image/team/harsh_emoji.jpeg",
    },
    {
      name: "Harshil",
      desc: "I am BATMAN ",
      image: "./assets/image/team/harshil.jpg",
      emoji: "./assets/image/team/harshil_emoji.jpg",
    },
    {
      name: "Manish",
      desc:
        "I am ambitious and driven. I thrive on challenge and constantly set goals for myself ",
      image: "./assets/image/team/manish.jpg",
      emoji: "./assets/image/team/manish_emoji.png",
    },
    {
      name: "Ankita",
      desc: "Yolo ",
      image: "./assets/image/team/ankita.jpg",
      emoji: "./assets/image/team/ankita_emoji.jpeg",
    },
    {
      name: "Kanishka",
      desc: "I am a people-person ",
      image: "./assets/image/team/kanishka.jpg",
      emoji: "./assets/image/team/kanishka_emoji.jpeg",
    },
  ];
  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
