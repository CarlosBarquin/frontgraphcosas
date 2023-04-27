import { getSSRClient } from "@/libs/client";
import { gql, useQuery } from "@apollo/client";
import { error } from "console";
import Link from "next/link";
import React, {FC, useState} from "react";
import styled from "styled-components";

const Pagina: FC<{page : number}> = ({page}) => {

        const query = gql`
        query character($page: Int!) {
            characters(page: $page) {
                results {
                    name
                    image 
                }
            }
        }
        `;
        const [pageac, setPage] = useState<number>(parseInt(page.toString()))

        const siguiente = () => {
            if(pageac < 41){
        setPage(pageac + 1)
            }
        }

        const anterior = () => {
        if(pageac >1){
            setPage(pageac - 1);
        }
        };

        const {loading, error, data } = useQuery<{
            characters: {
                results: {
                    name:string
                    image:string
                }[]
            }   
        }>(query,{
            variables: {
                page : pageac
            }
        })
       

        if(loading) return <div>Loading...</div>
        if(error) return <div>no data</div>

        return( 
            <div>
                 <Link href={`/page/${pageac+1}`}>
                <button onClick={siguiente}>next</button>
            </Link>

            <Link href={`/page/${pageac-1}`}>
        <button onClick={anterior}>back</button>
      </Link>


                <StyledContent>
                {data?.characters.results.map((character,index) => {
                    if(page == 0){
                        index = 20*(page) + index +1
                    }else{
                        index = 20*(page-1) + index +1
                    }
                    return <div>
                        <Link href={`/character/character2/${index}`}>{character.name}</Link>
                        <br></br>
                        <img src={character.image} alt="image" />
                    </div>
                })
                }

                </StyledContent>

       
                
                   
                    
            </div>
        )

        





 
   
   
      }
  
    
      const StyledContent = styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        

    `;
    
    export default Pagina