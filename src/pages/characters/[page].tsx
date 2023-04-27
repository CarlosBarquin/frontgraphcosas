import { getSSRClient } from "@/libs/client"
import { gql } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next"
import Character from "@/components/Character";
import Pagina from "@/components/Pagina";

export const getServerSideProps: GetServerSideProps = async (context) => {

    const {page}  = context.query

    return {    
        props: {
            page
        }
    }

}

const Page : NextPage<{page:number}> = ({page}) => {
    return (
        <>
          <Pagina page={page}/>
        </>
    )
}

export default Page