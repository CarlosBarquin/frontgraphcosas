import { getSSRClient } from "@/libs/client"
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next"
import styled from "styled-components";

export const getServerSideProps: GetServerSideProps = async (context) => {

  const {id2}  = context.query

  const query = gql`
    query character($id: ID!) {
        character(id : $id) {
            name
            image
            episode{
              name
            }
        }
    }
    `;

  

  const client = getSSRClient();
  
  const {data} = await client.query<{
    character: {
      name:string
      image:string
      episode: {
        name:string
      }[]
    }
  }>({
    query,
    variables: {
      id: id2
    }
  })

  console.log(data?.character.episode[0].name)
  console.log(data.character.episode)

  return {
    props: {
      name: data.character.name,
      image: data.character.image,
      episode : data.character.episode
    },
  };
};


export default function Home(props: { name: string, image: string, episode: {name:string}[]}) {
  return (
    <>
      {props.name}
      <img src={props.image} alt="image" />
      { props.episode.map((ep) => {
        return <div>{ep.name}</div>
      })
      }
      
    </>
  )
}

