import { getSSRClient } from "@/libs/client";
import { gql, useQuery } from "@apollo/client";
import { error } from "console";
import React, {FC} from "react";

const Character: FC<{id : string}> = ({id}) => {

    const query = gql`
    query character($id: ID!) {
        character(id : $id) {
            name
        }
    }
    `;


 
    const {loading, error, data } = useQuery<{
        character: {
          name:string
        }
      }>(query,{
        variables: {
          id: id
        }
      })

      console.log(data?.character.name)
      console.log(id)
    
      if(loading) return <div>Loading...</div>
      if(error) return <div>no data</div>
        return(
            <div>
                {data!.character.name}
            </div>
          )
      }
  
    
    
    export default Character