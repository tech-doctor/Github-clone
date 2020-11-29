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
      name
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
            viewerHasStarred
            forkCount
            licenseInfo{
              name
            }
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


const token = "MY_SECRET_TOKEN";
const baseUrl = "https://api.github.com/graphql";

//696bd7b2bde02c79c0acc67cba42947952b8f95f
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

  
  const firstDiv = document.querySelector('.div-1')
  const {name,avatarUrl,status,login,bio,email,location,twitterUsername,websiteUrl,followers,following, starredRepositories, repositories} = data;

  const navAvatar =  document.querySelectorAll('.nav-image');
  navAvatar.forEach(navAvatar => {
    navAvatar.src = avatarUrl
  })


  const profile = `
    <div class="bio-flex">
      <div>
        <img src =${avatarUrl} alt="profile-pic" ></img><br>
      </div>
      <div class="bio-name">
        <div class="status-emoji">
        ${status.emojiHTML}
        </div>
        <span class="name">${name}</span><br>
        <span class="nick">${login}</span>
      </div>
    </div>
    <p class="about me">${bio}</p>
    <div class="mobile-location">
      <span class="email"><i class="far fa-envelope"></i>${email}</span><br>
      <span class="website"><i class="fas fa-link"></i><a href = ${websiteUrl}>${websiteUrl}</a></span><br>
    </div>
    <p class="friends">
      <span class="followers"><a href="#"><i class="fas fa-user-friends"></i><strong> ${followers.totalCount}</strong> followers.</span></a>
      <span class="following"><a href="#"><strong> ${following.totalCount}</strong> following.</span></a>
      <span class = "stars"><a href="#"><i class="far fa-star"></i><strong>${starredRepositories.totalCount}</strong></span></a>
    </p>
    <p class="location">
      <span class="city"><i class="fas fa-map-marker-alt"></i>${location}</span><br>
      <span class="email"><i class="far fa-envelope"></i>${email}</span><br>
      <span class="website"><i class="fas fa-link"></i><a href = "#">${websiteUrl}</a></span><br>
      <span class="twitter"><i class="fab fa-twitter"></i><a href = https://www.twitter.com/${twitterUsername}>${twitterUsername}</a></span>
    </p>
    <hr>
  `
  firstDiv.innerHTML = profile

  const repoCount = document.querySelector('.repo-count');
  repoCount.innerHTML = data.repositories.totalCount


  repositories.edges.map((repo, i) => {
  const {name,parent, url,   viewerHasStarred, description, stargazerCount,primaryLanguage, licenseInfo, updatedAt} = repo.node

  const contentDiv = document.querySelector(".content-div")
  const repository = () =>{
  contentDiv.innerHTML = '';
   const result = `
    <div class="repository-content">
      <div class="left">
        <p class="repo-name"><a href=${url}>${name}</a><br>
        ${parent? `<span class="forked-source">Forked from <a href = ${parent.url}>${parent.nameWithOwner}</a></span>` : ''}
        ${description ? `<br><span class="repo-description">${description}</span>`: ''
        }  
        </p>
        <div class="repo-extradetails">
          <span class="repo-stack"><i class ="fas fa-circle" style="color: ${primaryLanguage.color};" ></i>${primaryLanguage.name}</span>
         ${stargazerCount? `<span class="repo-star"><i class="far fa-star"></i>${stargazerCount}</span>`: ""}
         ${parent? `<span class="fork-count"><svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>${parent.forkCount}</span>`: ""}
          ${licenseInfo? `<span class="license"><svg class="octicon octicon-law mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg>${licenseInfo.name}</span>`: ""}

          <span class="repo-update">Updated<span>${formatTimeUpdated(updatedAt)}</span></span>
        </div>
      </div>
      <div class="right">
        <p>
         ${ viewerHasStarred? `<button><i class="fas fa-star" id ="unstar"></i>Unstar</button>`: 
          `<button><i class="far fa-star"></i>Star</button>`}
        </p>
        
      </div>
    </div>
   `
   return result 
  }


  contentDiv.innerHTML += repository()

  })

})
.catch(error=> console.log(error))



const getInterval = (updatedTimeStamp, format) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const timeParam = { second, minute, hour, day };
  return Math.floor(updatedTimeStamp / timeParam[format]);
}

const formatTimeUpdated = (date) => {
  const updatedDate = Date.parse(date);
  const modifiedUpdate = (new Date(updatedDate)).toDateString()
  const daysInterval = getInterval(Date.now() - updatedDate, "day");
  if (daysInterval >= 30) {
    const [_, month, day, year] = /\s(\w{3})\s(\d{2})\s(\w{4})/.exec(modifiedUpdate);
    return `on ${parseInt(day)} ${month} ${(new Date()).getFullYear() === +year ? "" : year}`
  }
  else {
    let formats = ["day", "hour", "minute", "second"];
    const lastUpdated = formats.map(format => {
      const when = getInterval(Date.now() - updatedDate, format)
      return `${when} ${when > 1 ? `${format}s` : format} ago`;
    })
      .filter(value => parseInt(value) !== 0)
    return lastUpdated[0];
  }
}



