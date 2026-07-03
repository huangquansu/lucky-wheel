import react from "react"


function Footer(){
    const year = new Date().getFullYear()
    return(
        <footer>
            <p>Copyright ⓒ {year} Hank Su</p>
        </footer>
    )
}
export default Footer