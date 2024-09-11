/**
 * @file localStorage/sessionStorage相关
 * 
 * @date 2024/05/21
 */
import type { App } from 'vue'
import ItsStorage from 'its-storage'

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8q9Luc3SC+Mk2HBngT4PWm73/
XZ7CZXMdtwzTUBkTbZCB9oAppPFL2mTBkGwIMl3FmGMxdSOkzPLsmmlTIyI3Y6Eb
SRBaA3usTPGZuBRpuBwhshpcSaV9aLEbQI39TxgonMhkd5yOYbWmxLGfuKclS9BW
uX4Y2iB9MkW2rBozOQIDAQAB
-----END PUBLIC KEY-----`

const privateKey = `-----BEGIN PRIVATE KEY-----
MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBALyr0u5zdIL4yTYc
GeBPg9abvf9dnsJlcx23DNNQGRNtkIH2gCmk8UvaZMGQbAgyXcWYYzF1I6TM8uya
aVMjIjdjoRtJEFoDe6xM8Zm4FGm4HCGyGlxJpX1osRtAjf1PGCicyGR3nI5htabE
sZ+4pyVL0Fa5fhjaIH0yRbasGjM5AgMBAAECgYBpnFDlU1F74uFW3aIKctgcsG9J
W9F7hahLkOSoAKUYv/LtHNue9Apx6F0QENS4PeFJs0SLMcPzAxpUIRcmB3ulyVFt
cGyYh9WfFPLCgvi1Mty/fy4z+V73jRzAAxeEj9e/MOIMrH+uy/Z73mEG0DN4wd0/
sBy7rHWdXWrdl9tC1QJBAOb2Q/89Wb2SeY9E4prqafpib/hwFWH7GIvMWw+UdLIy
ih2zSLAcMNsU6FVs9+1s1bg34O8S6/EKC0lDgoa/viMCQQDRH+PioqtivMLDPpZK
LDlQuWfW1i78d+nOdAr6qmpvoiNxcfOIDU35Qksa0TKZJG8fi7+sutsBJ2dNizWL
I+jzAkEAoQoVX2Lnr8bx+3OMjXflbTA14oREZI0wEEntNG/O7nFO3GalyCXf6uIp
HWddd67rVgegTxJicS8Pr4Xi/RG1AQJBAICi5jHNsDDfPcqN4DKl+2eddLNhMqvY
MzjshqhkVW5vxO+Okaf5zyHpVnubfU1YbQZxlyjwE7ElBNVdMUVyhGMCQQC6U88U
lCLp37QOSob2/U0GNCojVGUuu958ovwX6x37e7azGzNZtjn2m773DaFNUl9Bo7a8
CoxfAPrzqxBpzCYJ
-----END PRIVATE KEY-----`

// 自定义配置项时 storage 必传
export const local = ItsStorage.create({
  storage: 'local',
  namespace: 'ITS_',
  // 设置了 encryption 为 true 才会加密
  encryption: false,
  publicKey,
  privateKey
})
export const session = ItsStorage.create({
  storage: 'session',
  namespace: 'ITS_',
  // 设置了 encryption 为 true 才会加密
  encryption: false,
  publicKey,
  privateKey
})

class Storage {
  static install(app: App): void {
    app.config.globalProperties.$local = local
    app.config.globalProperties.$session = session
  }
}

export default Storage
