const tablinks = document.querySelectorAll('.tablinks');
const tabcontent = document.querySelectorAll('.tabcontent');
const defaultOpen = document.getElementById("defaultOpen")



openCity = (event, cityName) =>{
  tabcontent.forEach(tabcontentLoop =>{
  tabcontentLoop.style.display = 'none'
  })
  const Tabs = document.getElementById(cityName)
  Tabs.style.display = "block";

  tablinks.forEach(tablinksLoop => {
  tablinksLoop.className = tablinksLoop.className.replace('active', "")
  })
  
  event.currentTarget.className += " active";
}

defaultOpen.click();


const barIcon = document.querySelector('#bars');
const mobileDropdown = document.querySelector(".mobile-dropdown")

barIcon.addEventListener('click', ()=>{
mobileDropdown.classList.toggle("toggle-bar")
})


const github_data ={
    "token": "15bd7b026859cf03790a9498405702a2fd915d12",
    "username": "tech-doctor"
}


const body = {
  "query" : `
  query { 
    user(login: "tech-doctor"){
      avatarUrl,
      status {
        id
      }
      login
      bio
      followers{
        totalCount
      }
      following{
        totalCount
     }
     starredRepositories{
      totalCount
    }
      location
      email
      websiteUrl
      twitterUsername
      repositories(first:20, orderBy:{field: UPDATED_AT, direction: DESC}){
       totalCount
        edges{
          node{
            id
            name
            url
            primaryLanguage{
              name
              color
            }
            stargazerCount
            updatedAt
            description
            isFork
            licenseInfo {
              id
              name
            }
          
          }
        }
  }
    }
    
  }`
}

const baseUrl = "https://api.github.com/graphql";

const header = {
  "content-Type": "application/json",
  "bearer token" : 'bearer' + github_data["token"]
}


fetch (baseUrl, {
  method:"POST",
  header : header,
  body: JSON.stringify(body)
})
.then(response => {console.log(JSON.stringify(response))})
.catch(error=> console.log(error))
