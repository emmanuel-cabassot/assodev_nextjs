import data from "./../../../data/data.json";
import Link from 'next/link';

const EventCatPage = ({ data, city }: { data: any, city: any }) => {
    return (
        <div>
            <h1>{`Event in ${city}`} </h1>
            <div>
                {data.map((event: any) => {
                    return (
                        <Link key={event.id} href={`/events/${event.city}/${event.id}`}>
                        <img src={event.image} alt={event.title} width={400} height={300} />
                        <h2>{event.title}</h2>
                    </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default EventCatPage;

export async function getStaticPaths() {
    const { events_categories } = await data;
    const allPaths = events_categories.map((event: any) => {
        return {
            params: {
                cat: event.id.toString(),
            }
        }
    })

    return {
        paths: allPaths,
        fallback: false,
    };
}

export async function getStaticProps(context: any) {
    const { cat } = await context.params;
    const { allEvents } = await data;
    const events = await allEvents.filter((event: any) => event.city === cat);

    return {
        props: {
            data: events,
            city: cat,
        },
    };
}
