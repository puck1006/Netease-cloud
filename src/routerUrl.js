let urls;

if (window.location.host == "easx.kedingdang.com") {
  urls = {
    wpc: "https://sclogin.kedingdang.com",
    crmUrl: "https://crm.kedingdang.com",
    gmcUrl: "https://gmc.kedingdang.com",
    smcUrl: "https://smc.kedingdang.com",
    easxUrl: 'https://easx.kedingdang.com',
    wpcApi: "https://scloginapi.kedingdang.com",
    cmrApiUrl: "https://crmapi.kedingdang.com",
    gmcApiUrl: "https://gmcapi.kedingdang.com",
    smcApiUrl: "https://smcapi.kedingdang.com",
    easxApiUrl: 'https://easxapi.kedingdang.com',
  };
} else {
  urls = {
    wpc: "http://sclogin.kedingdang.cn",
    crmUrl: "http://crm.kedingdang.cn",
    gmcUrl: "http://gmc.kedingdang.cn",
    smcUrl: "http://smc.kedingdang.cn",
    easxUrl: 'http://easx.kedingdang.cn',
    wpcApi: "http://scloginapi.kedingdang.cn",
    cmrApiUrl: "http://crmapi.kedingdang.cn",
    gmcApiUrl: "http://gmcapi.kedingdang.cn",
    smcApiUrl: "http://smcapi.kedingdang.cn",
    easxApiUrl: 'http://easxapi.kedingdang.cn',
  };
}

export default urls;
