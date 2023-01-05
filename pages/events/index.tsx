import Image from "next/image";
import data from "./../../data/data.json";
import Link from 'next/link';

interface Event {
    id: string;
    image: string;
    name: string;
    title: string;
    description: string;
}

const EventsPage = ({data}: {data: any}) => {
    return (
        <div>
            <h1>Events</h1>
            {data.map((event: Event) => {
                return (
                    <Link key={event.id} href={`/events/${event.id}`} >
                        <Image src={event.image} alt={event.title} width={400} height={300} />
                        <h2>{event.title}</h2>
                    </Link>
                )
            }
            )}
        </div>
    );
};

export default EventsPage;

export async function getStaticProps() {
    const { events_categories } = await data;
    
    return {
        props: {
            data: events_categories,
        },
    };
}