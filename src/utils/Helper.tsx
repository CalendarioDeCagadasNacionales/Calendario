export const queryTemplate = (year, month) =>{
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