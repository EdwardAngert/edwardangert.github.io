"use strict";(self.webpackChunkea_dot_com=self.webpackChunkea_dot_com||[]).push([[351],{1513:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>t,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>a});var i=s(5893),r=s(1151);const l={title:"Set Up Raspberry OS and Install Pi-Hole",sidebar_position:2},t=void 0,o={id:"docs/pi-hole/install-configure",title:"Set Up Raspberry OS and Install Pi-Hole",description:"Install Software Locally",source:"@site/docs/docs/pi-hole/install-configure.mdx",sourceDirName:"docs/pi-hole",slug:"/docs/pi-hole/install-configure",permalink:"/docs/pi-hole/install-configure",draft:!1,unlisted:!1,editUrl:"https://github.com/EdwardAngert/edwardangert.github.io/edit/main/docs/docs/pi-hole/install-configure.mdx",tags:[],version:"current",lastUpdatedAt:1704304791,formattedLastUpdatedAt:"Jan 3, 2024",sidebarPosition:2,frontMatter:{title:"Set Up Raspberry OS and Install Pi-Hole",sidebar_position:2},sidebar:"docs",previous:{title:"Install and Configure Pi-Hole With Unbound on a Local Omada Controller",permalink:"/docs/pi-hole/"},next:{title:"Add Block/Allowlists to the Pi-hole",permalink:"/docs/pi-hole/block-allow-lists"}},d={},a=[{value:"Install Software Locally",id:"install-software-locally",level:2},{value:"Format the SD Card",id:"format-the-sd-card",level:2},{value:"Create the Pi OS Image on the SD Card",id:"create-the-pi-os-image-on-the-sd-card",level:2},{value:"Find the Pi&#39;s IP Address",id:"find-the-pis-ip-address",level:2},{value:"Install Pi-hole",id:"install-pi-hole",level:2}];function h(e){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components},{Details:l}=n;return l||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"install-software-locally",children:"Install Software Locally"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://www.sdcard.org/downloads/formatter/",children:"SD Card Formatter"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Install using ",(0,i.jsx)(n.a,{href:"https://brew.sh/",children:"Homebrew"}),": ",(0,i.jsx)(n.code,{children:"brew install --cask sdformatter"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://www.raspberrypi.com/software/",children:"Raspberry Pi Imager"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Install using Homebrew: ",(0,i.jsx)(n.code,{children:"brew install --cask raspberry-pi-imager"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"format-the-sd-card",children:"Format the SD Card"}),"\n",(0,i.jsx)(n.p,{children:"This process erases everything on the SD card."}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Insert a microSD card, then Open SD Card Formatter and choose the card from the ",(0,i.jsx)(n.strong,{children:"Select card"})," dropdown."]}),"\n",(0,i.jsxs)(n.li,{children:["Click ",(0,i.jsx)(n.strong,{children:"Format"})," to format the card.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The default settings are fine: Quick format and no volume label."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"create-the-pi-os-image-on-the-sd-card",children:"Create the Pi OS Image on the SD Card"}),"\n",(0,i.jsx)(n.p,{children:"Raspberry Pi Imager makes the SD card a bootable drive."}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Open Raspberry Pi Imager"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Choose Device"}),": Raspberry Pi 4"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Choose OS"}),": Raspberry Pi OS (64-bit)"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Choose Storage"})," to select the SD card"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"Next"})}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["In the ",(0,i.jsx)(n.strong,{children:"Use OS customisation?"})," popup that appears, click ",(0,i.jsx)(n.strong,{children:"EDIT SETTINGS"}),". If the device you're using is connected to Wi-Fi, a prompt will show, asking if you'd like to use the Wi-Fi password from the system pre-filled in the Customisation screen. If you don't pre-fill it, you can still enter it on the next screen."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Raspberry Pi Imager OS Customisation window with all options checked in the General tab.",src:s(4160).Z+"",width:"528",height:"640"})}),"\n",(0,i.jsxs)(n.p,{children:["Make your selections in the ",(0,i.jsx)(n.strong,{children:"GENERAL"})," tab. Use your own easy-to-remember username and password:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"\u2611 Set hostname"}),": ",(0,i.jsx)(n.code,{children:"pi-hole"}),".local"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"\u2611 Set username and password"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"\u2611 Username"}),": ",(0,i.jsx)(n.code,{children:"probablyedward"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"\u2611 Password"}),": ",(0,i.jsx)(n.code,{children:"probablyhunter2"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"\u2611 Configure wireless LAN"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Only if it's not going to be plugged in via Ethernet."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"Set locale settings"})}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["In the ",(0,i.jsx)(n.strong,{children:"SERVICES"})," tab:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"\u2611 Enable SSH"})," and ",(0,i.jsx)(n.strong,{children:"\u2611 Use password authentication"}),"\n",(0,i.jsx)(n.strong,{children:"Save"})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["In the ",(0,i.jsx)(n.strong,{children:"OPTIONS"})," tab:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Uncheck ",(0,i.jsx)(n.strong,{children:"Enable telemetry"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Plug it in and give it a minute to load."}),"\n",(0,i.jsx)(n.h2,{id:"find-the-pis-ip-address",children:"Find the Pi's IP Address"}),"\n",(0,i.jsxs)(n.p,{children:["If you configured Wi-Fi and plugged the Pi in via Ethernet, your Pi will have two IP addresses. To make it easier to ",(0,i.jsx)(n.a,{href:"network-level-blocking#configure-the-omada-controller-to-enable-network-wide-blocking-with-pi-hole",children:"enable network-wide blocking"})," later, identify the Pi's Ethernet IP address."]}),"\n",(0,i.jsx)(n.p,{children:"For me, I use a TP-Link Omada controller:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Log in and click the site's name."}),"\n",(0,i.jsxs)(n.li,{children:["Click ",(0,i.jsx)(n.strong,{children:"Clients"})," then ",(0,i.jsx)(n.strong,{children:"Wired"})," to filter the table of connected clients."]}),"\n",(0,i.jsxs)(n.li,{children:["Click ",(0,i.jsx)(n.strong,{children:"pi-hole"})," in the ",(0,i.jsx)(n.strong,{children:"USERNAME"})," column to open the ",(0,i.jsx)(n.strong,{children:"Details"})," sidebar."]}),"\n",(0,i.jsxs)(n.li,{children:["Click ",(0,i.jsx)(n.strong,{children:"Config"})," and check ",(0,i.jsx)(n.strong,{children:"\u2611 Use Fixed IP Address"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"install-pi-hole",children:"Install Pi-hole"}),"\n",(0,i.jsxs)(l,{children:[(0,i.jsx)("summary",{children:"If you skipped to this section, expand this for things to look out for."}),(0,i.jsx)(n.p,{children:"If you installed Pi-hole on an existing device or skipped to this section"}),(0,i.jsx)(n.p,{children:"OS-specific things that might be different for your setup:"}),(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Installed software like Git, curl, or zsh"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"apt"})," package manager. Your OS might use a different one."]}),"\n",(0,i.jsxs)(n.li,{children:["User accounts. The examples I use are ",(0,i.jsx)(n.code,{children:"probablyedward"})," and ",(0,i.jsx)(n.code,{children:"pi"})]}),"\n"]})]}),"\n",(0,i.jsxs)(n.p,{children:["Replace the username, ",(0,i.jsx)(n.code,{children:"probablyedward"}),", and example IP, ",(0,i.jsx)(n.code,{children:"192.0.2.25"}),", in these steps with your Pi's username and local IP."]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Open your terminal app and SSH to the Pi:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-zsh",children:"ssh probablyedward@192.0.2.25\n"})}),"\n",(0,i.jsx)(n.p,{children:"Enter the password when prompted."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Update the system and install dependencies:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-zsh",children:"sudo apt update && sudo apt upgrade -y\nsudo apt install git php-cli php-sqlite3 php-intl php-curl unbound\n"})}),"\n",(0,i.jsx)(n.p,{children:"Enter the password when prompted. This is the point at which I also configure my command line interface (CLI) and editor, but that's outside the scope of this doc."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Run the Pi-hole installation script:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-zsh",children:"curl -sSL https://install.pi-hole.net | bash\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"The script will prompt you with a number of warnings and options. When prompted select:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Choose An Interface"}),": ",(0,i.jsx)(n.code,{children:"eth0"})," for Ethernet."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Static IP Address"}),": ",(0,i.jsx)(n.code,{children:"Yes"})," and enter the IP address you found in ",(0,i.jsx)(n.a,{href:"#find-the-pis-ip-address",children:"Find the Pi's IP Address"}),".","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Unless you've made specific changes to the network, the gateway address should be the IP of the router or controller. In this example, that's ",(0,i.jsx)(n.code,{children:"192.0.2.1"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Upstream DNS Provider"}),": Select ",(0,i.jsx)(n.code,{children:"Cloudflare"})," for now. This is a setting we'll change later, but we select ",(0,i.jsx)(n.a,{href:"https://one.one.one.one/dns#explanation",children:"Cloudflare's DNS server"})," now so that every DNS request from the Pi going forward will be routed through a trusted directory."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Blocklists"}),": ",(0,i.jsx)(n.code,{children:"Yes"})," to use the default list."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Admin Web Interface"}),": ",(0,i.jsx)(n.code,{children:"Yes"})," to install the Pi-hole web interface.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Web Server"}),": ",(0,i.jsx)(n.code,{children:"Yes"})," to install lightppd for the web interface."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Enable Logging"}),": ",(0,i.jsx)(n.code,{children:"Yes"})," to enable query logging. This helps diagnose issues like when Hulu or Disney+ won't load on your smart TV.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Select a privacy mode"}),": ",(0,i.jsx)(n.code,{children:"0"})," to show what site got blocked on which device. Consult the ",(0,i.jsx)(n.a,{href:"https://docs.pi-hole.net/ftldns/privacylevels/",children:"official Pi-hole docs"})," for more information about the privacy levels."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"The last screen lists the IP and a temporary password for the Pi-hole web interface. Since we'll change it in the next step, it's safe to ignore this."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Change the temporary password. Change the ",(0,i.jsx)(n.code,{children:"examplePassword"})," in this example:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-zsh",children:"pihole -a -p examplePassword\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Optional: Follow the steps in the official ",(0,i.jsx)(n.a,{href:"https://docs.pi-hole.net/guides/dns/unbound/#configure-unbound",children:"Pi-hole documentation to configure unbound"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["This step is optional because the Pi-hole is already configured to use Cloudflare's DNS provider. Use unbound if you prefer a ",(0,i.jsx)(n.a,{href:"https://docs.pi-hole.net/guides/dns/unbound/#what-is-a-recursive-dns-server",children:"recursive DNS server"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Log in to the Pi-hole web interface: ",(0,i.jsx)(n.a,{href:"http://pi.hole/admin",children:"http://pi.hole/admin"})]}),"\n"]}),"\n"]})]})}function c(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},4160:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/r-pi-imager-customisation-9a2bf9720ae7aad80760abec0538384d.png"},1151:(e,n,s)=>{s.d(n,{Z:()=>o,a:()=>t});var i=s(7294);const r={},l=i.createContext(r);function t(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);