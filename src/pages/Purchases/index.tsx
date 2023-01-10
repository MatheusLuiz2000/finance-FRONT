import React, { useState } from "react";
import Content from "../../components/Content";
import _ from "lodash";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AnalyzePerMonth from "../../components/AnalyzePerMonth";
import AnalyzePeriod from "../../components/AnalyzePeriod";


const Purchases: React.FC<any> = () => {
  const [tabIndex, setTabIndex] = useState(0);


  return (
    <Content title="Analise dos gastos">
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Análise por mês</Tab>
          <Tab>Análise por período</Tab>
          <Tab>Comparativa</Tab>
          <Tab>Receita vs Gasto</Tab>
        </TabList>
        <TabPanel>
          <AnalyzePerMonth />
        </TabPanel>
        <TabPanel><AnalyzePeriod /></TabPanel>
        <TabPanel>3</TabPanel>
        <TabPanel>4</TabPanel>
      </Tabs>
    </Content>
  );
};

export default Purchases;
