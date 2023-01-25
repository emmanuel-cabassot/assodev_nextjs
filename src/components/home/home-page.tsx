import Image from "next/image"
import Link from "next/link"
interface Event {
  id: string;
  image: string;
  name: string;
  title: string;
  description: string;
}

export const HomePage = ({ data }: { data: any }) => (
  <div className="home_body">
    {data.map((event: Event) => {
      return (
        <Link className="card" key={event.id} href={`/events/${event.id}`}>
          <div className="image">
            <Image src={event.image} alt={event.title} width={600} height={400} />
          </div>
          <div className="content">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </div>
        </Link>
      )
    }
    )}
  </div>
);