import { getSSRClient } from "@/libs/client"
import { gql } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next"
import Character from "@/components/Character";

export const getServerSideProps: GetServerSideProps = async (context) => {

    const {id}  = context.query

    return {    
        props: {
            id
        }
    }

}

const Page : NextPage<{id:string}> = ({id}) => {
    return (
        <>
            <Character id={id}/>
        </>
    )
}

export default Page