/**
 * @file antd的引入
 * 
 * @date 2022/07/27
 */
import type { App } from 'vue'
// 引入所有的图标，方便开发平台配置菜单图标
import * as icons from '@ant-design/icons-vue'
import {
  ConfigProvider,
  Layout,
  Menu,
  Tabs,
  message,
  Modal,
  Button,
  Checkbox,
  Input,
  Form,
  Divider,
  Row,
  Col,
  Select,
  Card,
  Table,
  Breadcrumb,
  Spin,
  Upload,
  Image,
  DatePicker,
  Tag,
  Tooltip,
  Radio,
  Pagination,
  Skeleton,
  Empty,
  Tree,
  Dropdown,
  Drawer,
  Popconfirm,
  Switch,
  TreeSelect
} from 'ant-design-vue'

const installComponents = [
  ConfigProvider,
  Layout,
  Menu,
  Tabs,
  Button,
  Modal,
  Checkbox,
  Input,
  Form,
  Divider,
  Row,
  Col,
  Select,
  Card,
  Table,
  Breadcrumb,
  Spin,
  Upload,
  Image,
  DatePicker,
  Tag,
  Tooltip,
  Radio,
  Pagination,
  Skeleton,
  Empty,
  Tree,
  Dropdown,
  Drawer,
  Popconfirm,
  Switch,
  TreeSelect
]

class Antd {
  /**
   * Called automatically by `app.use(Antd)`. Should not be called manually by
   * the user.
   * @param app - Application that uses the Antd
   */
  static install(app: App): void {
    // 全局注册所有 ant-design 图标
    for (const icon in icons) {
      const notIcons = ['createFromIconfontCN', 'default', 'getTwoToneColor', 'setTwoToneColor']
      if (!notIcons.includes(icon)) {
        app.component(icon, icons[icon as keyof typeof icons])
      }
    }
    installComponents.forEach((component) => {
      app.use(component)
    })
    app.config.globalProperties.$message = message
    app.config.globalProperties.$modal = Modal
  }
}

export default Antd
