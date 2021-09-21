export const queryTemplate = (year: string, month:string ) =>{
    const lastDay = new Date(parseInt(year),parseInt(month),0).getDate()
    const query =`{
      diaCollection(where:{
        AND:[
        {fecha_gte:"${year}-${month}-01"}
        {fecha_lte:"${year}-${month}-${lastDay}"}
      ]
      },
      order: fecha_ASC
      ){
        items{
          noticia
          urlNoticia
          fecha
        }
      }
    }`
    return query
}

export const padzero = (monthString: string, nextMonth: boolean) => {
  const parsedMonth = parseInt(monthString)
  if (nextMonth) {
    return `${parsedMonth+1 <= 9 ? '0' : ''}${parsedMonth+1}`
  } else {
    return `${parsedMonth-1 <= 9 ? '0' : ''}${parsedMonth-1}`
  }
}