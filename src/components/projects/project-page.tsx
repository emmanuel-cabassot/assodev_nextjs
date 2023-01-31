import Image from "next/image"
import Link from "next/link"
import { allProjectReqApi } from "../../../api/projectDev/projects/allProject";
// interface Event {
//   id: string;
//   image: string;
//   name: string;
//   title: string;
//   description: string;
// }

interface Project {
  id: string;
  name: string;
  description: string;
}


export const ProjectPage = async ({ data }: { data: any }) => {
  // const porjects = allProjectReqApi();
  // console.log(porjects);

  (
    <h1>ProjectPage</h1>

    // <div className="home_body">
    //   {data.map((event: Event) => {
    //     return (
    //       <Link className="card" key={event.id} href={`/events/${event.id}`}>
    //         <div className="image">
    //           <Image src={event.image} alt={event.title} width={600} height={400} />
    //         </div>
    //         <div className="content">
    //           <h2>{event.title}</h2>
    //           <p>{event.description}</p>
    //         </div>
    //       </Link>
    //     )
    //   }
    //   )}
    // </div>
  );
}