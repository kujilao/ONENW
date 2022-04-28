const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const ONENW = localStorage.getItem('ONENW')
const xObject = JSON.parse(ONENW)
const hashMap = xObject || [
    { logo: 'W', logoType: 'text', url: 'https://www.wangdoc.com' },
    { logo: 'I', logoType: 'image', url: 'https://www.iconfont.cn' },
    { logo: 'B', logoType: 'image', url: 'https://www.bootcdn.cn' }
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo[0]}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close"><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-close"></use>
        </svg></div>
        </div>
    </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入网址要添加的网址');
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), logoType: 'text', url: url });
        render()
    });
window.onbeforeunload = () => {
    console.log("ces");
    const string = JSON.stringify(hashMap)
    localStorage.setItem('ONENW', string)
}