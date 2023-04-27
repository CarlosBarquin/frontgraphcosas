import { getSSRClient } from "@/libs/client"
import { gql } from "@apollo/client";

export const getStaticProps = async () => {
  const query = gql`
    query { 
      character(id:2) {
        name
        image
      }
    }
  `;

  

  const client = getSSRClient();
  const {data} = await client.query({
    query
  })

  return {
    props: {
      name: data.character.name,
      image: data.character.image
    },
  };
};


export default function Home(props: { name: string, image: string}) {
  return (
    <>
      {props.name}
      <img src={props.image} alt="image" />
    </>
  )
}