import { Ticket } from "../types/Tickets";
import supabase from "./supabase";


export async function getTickets(){

   
    const {data , error} = await supabase.from('tickets')
    .select('*')

    if (error){
        console.error(error)
        throw new Error("tickets could not load")
    }
   
    return data;
   
}

export async function createTicket(newTicket:any){
const { data, error } = await supabase
  .from('tickets')
  .insert([ newTicket])
  .select()
  if (error){
    console.error(error)
    throw new Error("ticket could not be created ")
}

return data;
}
export async function editTicket (id:string,editedTicket: Partial<Ticket> ){
// to prevent unnecessary or invalid updates
  if (!editedTicket || Object.keys(editedTicket).length === 0) {
    throw new Error("No valid fields to update");
}

  const { data, error } = await supabase
    .from('tickets')
    .update({...editedTicket})
    .eq('id', id)
    .select();
  
    if (error){
      console.error(error)
      throw new Error("ticket could not be edited ")
  }
  //validating the returned data
  if(!data || data.length === 0 ){
    throw new Error("No tickets with the provided Id")
  }
   
  
  return data;
  }

export async function editTicketStatus (id:string,newStatus: Partial<Ticket> ){

const { data, error } = await supabase
  .from('tickets')
  .update({status: newStatus})
  .eq('id', id)
  .select();

  if (error){
    console.error(error)
    throw new Error("ticket could not be edited ")
}
 //validating the returned data
if(!data || data.length === 0 ){
  throw new Error("No tickets with the provided Id")
}
 

return data;
}

export async function deleteTicket(id:string){
    const { error } = await supabase
  .from('tickets')
  .delete()
  .eq('id', id)

  if (error){
    console.error(error)
    throw new Error("ticket could not be deleted ")
}

}