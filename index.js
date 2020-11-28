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



const body = {
  "query" : `
  query { 
    user(login: "tech-doctor"){
      avatarUrl,
      login
      bio
    status{
      emoji
      emojiHTML
    }
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
            isPrivate
            isArchived
            forkCount
            parent{
              nameWithOwner
              url
              forkCount
              licenseInfo {
              name
            }
            }
            
          }
        }
  }
    }
    
  }`
}


const token = "ab5ad6da225f992e57a62b8d159fa30f89a212ed";
const baseUrl = "https://api.github.com/graphql";

const headers = {
  "Content-Type": "application/json",
  "Authorization": `bearer ${token}`
}

fetch (baseUrl, {
  method:"POST",
  headers : headers,
  body: JSON.stringify(body)
})

.then(response => response.json())
.then(response => {
  const data = response.data.user
  console.log(data)
})
.catch(error=> console.log(error))

const contentDiv = document.querySelector(".content-div")

const repository = () =>{
contentDiv.innerHTML = '';
 const result = `<div class="repository-content">
 <div class="left">
   <p class="repo-name"><a href="#">My Portfolio.com</a><br>
     <span class="forked-source">Forked from <a href = "#">parent</a></span>
     <br><span class="repo-description">Repository description</span></p>
   
   
   <div class="repo-extradetails">
     <span class="repo-stack"><i class ="fas fa-circle"></i>Javascript</span>
     <span class="repo-star"><i class="far fa-star"></i>20</span>
     <span class="fork-count"><i class="fas fa-project-diagram"></i>2</span>
     <span class="license">License name, extends</span>
     <span class="repo-update">Updated on<span>12 Sep</span></span>
   </div>
 </div>
 <div class="right">
   <p>
     <button><i class="far fa-star"></i>Star</button>
   </p>
   
 </div>
</div>`
 return result 
}

contentDiv.innerHTML += repository()
