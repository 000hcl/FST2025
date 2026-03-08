import styled from 'styled-components'

export const Page = styled.div`
background: azure;
padding-bottom: 10px;
border-style: ridge;
border-color: lightcyan;
margin:auto;
max-width: 1100px;
color:rgb(0, 82, 41);
font-family: Arial, Helvetica, sans-serif;
`

export const NavButton = styled.a`
background: transparent;
display: inline-block;
color:rgb(0, 48, 24);
transition: all 200ms ease-in-out;
text-decoration: none;
vertical-align:middle;
font-weight: bold;
margin-right: 20px;

&:hover {
    color: white;
}
`

export const Button = styled.button`
background: rgb(0, 99, 49);
display: inline-block;

color: white;
text-align: center;
padding: 8px 10px;
border: none;
border-radius: 4px;
transition: all 180ms ease-in-out;
font-family: Arial, Helvetica, sans-serif;
font-weight: bold;
margin: 3px;
&:hover {
    background: rgb(0, 12, 6);
}
`

export const LoggedIn = styled.div`
color: white;
font-weight: bold;
display: inline-block;
vertical-align:middle;
`

export const NavBar = styled.div`
background: rgb(0, 160, 93);
padding: 10px;
`
export const Listing = styled.a`
background:transparent;
color:rgb(0, 48, 24);
box-sizing: border-box;
display: block;
padding: 10px;
text-decoration: none;
text-align: center;
transition: all 180ms ease-in-out;
&:hover {
    background: rgb(148, 231, 197);
}
`

export const FormStyle = styled.div`
margin: 10px 20px;

`

export const Title = styled.h2`
color:rgb(0, 48, 24);
font-weight: bold;
margin-left: 20px;
`

export const Input = styled.input`
border: 2px solid rgb(0, 160, 93);
margin: 2px;
border-radius: 3px;
color: rgb(0, 160, 93);
`

export const StyledNotification = styled.div`
border: 4px solid rgb(105, 83, 8);
border-radius: 6px;
margin: 2px;
background: rgb(240, 255, 101);
padding: 10px;
color: rgb(105, 83, 8);
`