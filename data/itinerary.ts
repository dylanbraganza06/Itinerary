export interface Activity {
  time: string;
  title: string;
  imageUrl?: string;
  mapsUrl?: string;
  alternateMapsUrl?: string;
  alternateTitle?: string;
  alternateImageUrl?: string;
}

export const itinerary: Record<string, Activity[]> = {
  day1: [
    {
      time: "7:00 AM",
      title: "Reach Quinta Rosa",
      imageUrl:
        "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQ0OTI0ODY5MzUwODgzNTk2Mw==/original/74decb78-e2fb-4be3-881c-a0542f02ba7e.jpeg?im_w=720",
      mapsUrl: "https://maps.app.goo.gl/ysZQ4mV52SFS6CYZA",
    },
    {
      time: "8:00 AM",
      title: "Breakfast at Geetesh",
      imageUrl:
        "https://lh3.googleusercontent.com/gps-cs-s/APNQkAG2mVfeSnJKba2XpqsuB76MGHXtxKtRwEQMdaP9Cn4c-wduJE_Y1YbGP3S3sIo8BDWuLgVnsXUlMGea2_kFYT04jE3M0RwCBWSMMr9MJ_2QvFqpEG2lK4zcrpVoPJxJ6xS52XFAdQ=s1360-w1360-h1020-rw",
      mapsUrl: "https://maps.google.com/?q=Geetesh+Restaurant+Goa",
    },
    {
      time: "11:00 AM",
      title: "Head to Morjim Beach",
      imageUrl:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/27/06/b7/view.jpg?w=1200&h=-1&s=1",
      mapsUrl: "https://maps.app.goo.gl/DXzCwjQ37ZmtPrCHA",
    },
    {
      time: "1:00 PM",
      title: "Lunch at Uma by the Sea",
      imageUrl:
        "https://content3.jdmagicbox.com/v2/comp/goa/y3/0832px832.x832.241203013804.m4y3/catalogue/uma-by-the-sea-morjim-goa-restaurants-64w60w7wqw.jpg",
      mapsUrl: "https://maps.app.goo.gl/CmGxAtmq7Hdr7Nw26",
    },
    {
      time: "3:00 PM",
      title: "Head to Chapora Fort",
      imageUrl:
        "https://media-cdn.tripadvisor.com/media/photo-s/10/ef/03/95/dil-chahta-hai-pose.jpg",
      mapsUrl: "https://maps.google.com/?q=Chapora+Fort+Goa",
    },
    {
      time: "4:00 PM",
      title: "Play Football at Vagator Beach",
      imageUrl:
        "https://preview.redd.it/early-morning-football-at-kozhikode-beach-v0-gq7zv64q7k8g1.jpeg?width=1080&crop=smart&auto=webp&s=c06567954492f325cdf664e1b121a78924a5c79d",
      mapsUrl: "https://maps.app.goo.gl/sBa7YmqAB1Q3x9rC7",
    },
    {
      time: "6:00 PM",
      title: "Go Karting",
      imageUrl:
        "https://gforcegokarting.in/wp-content/uploads/2025/01/1.jpg",
      mapsUrl: "https://maps.app.goo.gl/oxgB9B27kLFahR95A",
    },
    {
      time: "8:00 PM",
      title: "Dinner at Noronhas Corner",
      imageUrl:
        "https://d10y46cwh6y6x1.cloudfront.net/images/EF74CE10-11F1-42B6-9587-F9C145A01128.png",
      mapsUrl: "https://maps.app.goo.gl/kLRFZmxVTh2CQ8YE8",
    },
    {
      time: "10:00 PM",
      title: "Club / Tito's Lane (TBD)",
      mapsUrl: "https://maps.app.goo.gl/qFAfqMzwV5pkt3Tu8",
      alternateMapsUrl: "https://maps.app.goo.gl/BgvYL3DwTwRUgYXk7",
    },
  ],

  day2: [
    {
      time: "9:00 AM",
      title: "Leave for Fontainhas",
      imageUrl:
        "https://bharatexplored.com/wp-content/uploads/2026/01/The-Ultimate-Fontainhas-Goa-Guide-Mapping-the-Latin-Quarters-Magic-2.jpg",
      mapsUrl: "https://maps.app.goo.gl/8uFZo9xhPpPSVvaW7",
    },
    {
      time: "9:45 AM",
      title: "Breakfast at Confeitaria 31 De Janeiro",
      imageUrl:
        "https://img-cdn.publive.online/fit-in/900x1600/filters:format(webp)/english-betterindia/media/media_files/2025/12/08/big_114431_img_8513-2025-12-08-12-36-07.jpeg",
      mapsUrl: "https://maps.app.goo.gl/5EodNUbKWTU6AhQGA",
    },
    {
      time: "12:30 PM",
      title: "Leave for Cabo de Rama",
      imageUrl:
        "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGJRcK-XH10g8AHczU8aZs0nFDF33a-3UIil2Mm7tS2-NmcrawcVou3kY4AK4qNOwn5vTOuF65tOL_xf7FtnMKvBoiYIQUKPvA8LcBQ09NrZ92BjdkDxWUx8DOwpSEAHyOobjoR3RKkIOM=w408-h307-k-no",
      mapsUrl: "https://maps.google.com/?q=Cabo+de+Rama+Beach+Goa",
    },
    {
      time: "2:00 PM",
      title: "Thali at Starlight, Assolna",
      imageUrl:
        "https://lh3.googleusercontent.com/gps-cs-s/APNQkAE0-6rrOMKxgqirvpZt5Qfn-D4t6pbmaIHCjCRlAYd2qFCpbagvzP09iCGedZFRqUcC9lTrERjILENYjzEdSyZvUJZf5pBwMqp3LHZyA-2gdYjcpWvcXED5_qK6ZoV9CAd3pGl3PMvoGKVT=s1360-w1360-h1020-rw",
      mapsUrl: "https://maps.app.goo.gl/j18xaKdh7BLru6cm7",
    },
    {
      time: "3:30 PM",
      title: "Kayaking at Cabo de Rama",
      imageUrl:
        "https://tripinic.com/wp-content/uploads/2025/01/Cabo-de-Rama-Backwater.jpg",
    },
    {
      time: "5:00 PM",
      title: "Pebbles Beach",
      imageUrl:
        "https://img.atlasobscura.com/h3jDehTAK1cTIp0F0Qugn-Y--6hhcDEbpwUD1pa36x4/rt:fit/h:400/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy9lMGM2/ZDEzOGI2MmRjMDEy/MzY0OGZiMWEwMTI4/MDg1MzYwYTNlNzU1/LmpwZw.jpg",
      mapsUrl: "https://maps.google.com/?q=Pebbles+Beach+Goa",
    },
    {
      time: "9:00 PM",
      title: "Dinner at Antonio 31, Panaji",
      imageUrl:
        "https://www.indiafoodnetwork.in/h-upload/2022/08/03/765895-antonio.webp",
      mapsUrl: "https://maps.app.goo.gl/P37PoeHU5qi1jmY88",
    },
  ],

  day3: [
    {
      time: "8:30 AM",
      title: "Breakfast at Hi Cafe, Mapusa",
      imageUrl:
        "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHa7p4IN76vM_T3N9mDvp2RDjV2coC40aZ1rqhmHx-QcAEzKSIYo0uSSH_SFIPcZyrEdNVULyNwm4QYgN1ZMjvpPsbVIzUp_XmV1V1sotQWnuliaXiBWLBK4qGaW4GF_6Xi89NT8GXSLSyF=s1360-w1360-h1020-rw",
      mapsUrl: "https://maps.app.goo.gl/F7BWgEpobSq5AGEz5",
    },
    {
      time: "10:00 AM",
      title: "Leave for Padi Waterfall",
      imageUrl:
        "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGYKHfeaOXsvLV7YB9e7KGqWv7gTmZScX1iwrclugGvcyAUI3M2pYmJM_8efZuZ1YRgaerh4Z4fDeT4maPiUIEM23bpmd4_6LTyqd2hCiCiqeWSNocRlnMe4bndywYxSE6dgbxE=s1360-w1360-h1020-rw",
      mapsUrl: "https://maps.google.com/?q=Padi+Waterfall+Goa",
      alternateTitle: "Bamanbudo Waterfall",
      alternateImageUrl:
        "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGxAlpyBVSCYEAUNEoFAFgNzNUN7Fv22uK6x6RTFMxO-KEMmHvsu21eqX2FC5k-sjp2hlgSxiFlWlYokf14YGZUHDD0ADFu8ZznYJX6Scdu3s-pvBT47zQ9ms1hvVMyWj52LLLe=w270-h312-n-k-no",
      alternateMapsUrl:
        "https://www.google.com/maps?q=Bamanbudo+Waterfall+Goa",
    },
    {
      time: "3:00 PM",
      title: "Lunch on the way to Agonda Beach",
    },
    {
      time: "4:00 PM",
      title: "Explore South Goa (Agonda Beach)",
    },
    {
      time: "6:00 PM",
      title: "Leave for Home",
      imageUrl:
        "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQ0OTI0ODY5MzUwODgzNTk2Mw==/original/74decb78-e2fb-4be3-881c-a0542f02ba7e.jpeg?im_w=720",
      mapsUrl: "https://maps.app.goo.gl/ysZQ4mV52SFS6CYZA",
    },
    {
      time: "10:00 PM",
      title: "BBQ Dinner at Home",
      imageUrl:
        "https://www.foodandwine.com/thmb/hCELDCvQlfmtntS2XRZ3W6BsiaA=/fit-in/1500x2668/filters:no_upscale():max_bytes(150000):strip_icc()/faw-gas-grills-2-test-weber-genesis-e-325-propane-gas-rkilgore-1671-13007e89d7b54808a29f5c904a98b832.jpeg",
    },
  ],

  day4: [
    {
      time: "11:30 AM",
      title: "Wake Up and Pack Bags",
      imageUrl:
        "https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/19600914/GettyImages_1037487470.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
    },
    {
      time: "1:00 PM",
      title: "Brunch at Angry Sardar",
      imageUrl:
        "https://b.zmtcdn.com/data/pictures/5/19296585/ebf335aab8cc17e39bd216a983bda83b_featured_v3.jpg",
      mapsUrl: "https://maps.app.goo.gl/ZUFBYuM3EAnK6BfL7",
    },
    {
      time: "2:45 PM",
      title: "Leave for Thivim Station",
      imageUrl:
        "https://seawatersports.com/images/activies/thivim-station-taxi-service-in-goa.png",
      mapsUrl: "https://maps.app.goo.gl/bPqF8dVQNpPvyt636",
    },
  ],
};
