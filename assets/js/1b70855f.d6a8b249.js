"use strict";(self.webpackChunkea_dot_com=self.webpackChunkea_dot_com||[]).push([[150],{5387:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>a,contentTitle:()=>n,default:()=>d,frontMatter:()=>l,metadata:()=>r,toc:()=>c});var s=i(5893),o=i(1151);const l={title:"Add Block/Allowlists to the Pi-hole",sidebar_position:3},n=void 0,r={id:"docs/pi-hole/block-allow-lists",title:"Add Block/Allowlists to the Pi-hole",description:"The steps here use the pihole-updatelists script. The official pihole-updatelists documentation includes information about other set up and configuration options if you prefer to use Docker or would rather avoid piping to bash.",source:"@site/docs/docs/pi-hole/block-allow-lists.mdx",sourceDirName:"docs/pi-hole",slug:"/docs/pi-hole/block-allow-lists",permalink:"/edwardangert.github.io/docs/pi-hole/block-allow-lists",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Add Block/Allowlists to the Pi-hole",sidebar_position:3},sidebar:"docs",previous:{title:"Set Up Raspberry OS and Install Pi-Hole",permalink:"/edwardangert.github.io/docs/pi-hole/install-configure"},next:{title:"Configure Updates and Network-Level Blocking",permalink:"/edwardangert.github.io/docs/pi-hole/network-level-blocking"}},a={},c=[];function h(e){const t={a:"a",admonition:"admonition",code:"code",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:["The steps here use the pihole-updatelists script. The official ",(0,s.jsx)(t.a,{href:"https://github.com/jacklul/pihole-updatelists#update-pi-holes-lists-from-remote-sources",children:"pihole-updatelists documentation"})," includes information about other set up and configuration options if you prefer to use Docker or would rather avoid piping to bash."]}),"\n",(0,s.jsx)(t.admonition,{title:"Language is important",type:"tip",children:(0,s.jsxs)(t.p,{children:["This doc uses the words ",(0,s.jsx)(t.code,{children:"whitelist"})," and ",(0,s.jsx)(t.code,{children:"blacklist"})," to match the way the Pi-hole deals with allowlists and blocklists. So while descriptions of their actions here will be ",(0,s.jsx)(t.code,{children:"allowlist"})," and ",(0,s.jsx)(t.code,{children:"blocklist"}),", I'll use ",(0,s.jsx)(t.code,{children:"whitelist"})," and ",(0,s.jsx)(t.code,{children:"blacklist"})," when it matches text to edit."]})}),"\n",(0,s.jsxs)(t.p,{children:["Configure the Pi-hole to use a script from ",(0,s.jsx)(t.a,{href:"https://github.com/jacklul/pihole-updatelists#update-pi-holes-lists-from-remote-sources",children:"GitHub user jacklul"})," to apply:"]}),"\n",(0,s.jsx)(t.p,{children:"Blocklists from:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://firebog.net/",children:"The Firebog"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://github.com/StevenBlack/hosts",children:"StevenBlack/hosts"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://github.com/mmotti/pihole-regex/",children:"mmotti/pihole-regex"})}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"Allowlists from:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://github.com/anudeepND/whitelist",children:"anudeepND"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://github.com/mmotti/pihole-regex/",children:"mmotti/pihole-regex"})}),"\n"]}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsx)(t.p,{children:"Download and run the pihole-updatelists script:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-zsh",children:"wget -O - https://raw.githubusercontent.com/jacklul/pihole-updatelists/master/install.sh | sudo bash\n"})}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsx)(t.p,{children:"Edit the configuration file to add lists:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-zsh",children:"sudo nvim /etc/pihole-updatelists.conf\n"})}),"\n",(0,s.jsx)(t.p,{children:"Paste the following:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-text",metastring:'title="/etc/pihole-updatelists.conf" showLineNumbers',children:'; Pi-hole\'s Lists Updater by Jack\'lul\n; https://github.com/jacklul/pihole-updatelists\n; For a full list of available variables please see the readme.\n\n; Remote list URL containing list of adlists to import\n; URLs to single adlists are not supported here!\nADLISTS_URL="https://v.firebog.net/hosts/lists.php?type=tick https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/fakenews-gambling/hosts"\n\n; Remote list URL containing exact domains to whitelist\nWHITELIST_URL="https://raw.githubusercontent.com/anudeepND/whitelist/master/domains/whitelist.txt https://raw.githubusercontent.com/mmotti/pihole-regex/master/whitelist.list"\n\n; Remote list URL containing regex rules for whitelisting\nREGEX_WHITELIST_URL=""\n\n; Remote list URL containing exact domains to blacklist\n; This is specifically for handcrafted lists only, do not use regular blocklists here!\nBLACKLIST_URL=""\n\n; Remote list URL containing regex rules for blacklisting\nREGEX_BLACKLIST_URL="https://raw.githubusercontent.com/mmotti/pihole-regex/master/regex.list"\n'})}),"\n"]}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},1151:(e,t,i)=>{i.d(t,{Z:()=>r,a:()=>n});var s=i(7294);const o={},l=s.createContext(o);function n(e){const t=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:n(e.components),s.createElement(l.Provider,{value:t},e.children)}}}]);