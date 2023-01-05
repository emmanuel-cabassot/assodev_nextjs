import Image from "next/image";
import data from "./../../../data/data.json";
const EventPage = ({ data, city }: { data: any, city: any }) => {
    return (
        <div>
            <h1>{city}</h1>
            <h2>{data.title}</h2>
            <Image src={data.image ? data.image : '/images/404.png'} alt={data.title} width={600} height={400} />
            <p>{data.description}</p>
            <i>{data?.emails_registered}</i>
            <input type="email" /> <button>Submit</button>
        </div>
    );
};

export default EventPage;

export async function getStaticPaths() {
    const { allEvents } = await data;
    const allPaths = allEvents.map((event: any) => {
        return {
            params: {
                cat: event.city.toString(),
                id: event.id.toString(),
            }
        }
    })

    return {
        paths: allPaths,
        fallback: false,
    };
}

export async function getStaticProps(context: any) {
    const { cat, id } = await context.params;
    const { allEvents } = await data;
    const event = await allEvents.find((event: any) => event.city === cat && event.id === id);
    console.log('event', event)

    return {
        props: {
            data: event,
            city: event?.city
        },
    };
}
