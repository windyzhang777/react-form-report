export interface GetProfileRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetProfileResResult;
}

export interface GetProfileResResult {
  AirWatchUrl: string;
  Appversion: string;
  CalibrateAttributes: CalibrateAttributes;
  CanChangeStation: boolean;
  CanSelfUpgradeInspector: boolean;
  CanSelfUpgradeLead: boolean;
  Employee: Employee;
  EmployeeMenuActions: number[];
  ErrorMessage: null;
  EsfrUserPolicies: UserPolicy[];
  IsASCMFeatureEnabled: boolean;
  IsBaseFlow: boolean;
  IsEtaWebEnabled: boolean;
  IsFeatureToggleEnabled: boolean;
  IsInspUpgraded: boolean;
  IsLeadUpgraded: boolean;
  IsProductionController: boolean;
  IsSecondaryStation: boolean;
  IsSelfUpgradable: boolean;
  IsWmsStation: boolean;
  ShowCrewFunction: boolean;
  TechOpsSecurityUserPolicies: UserPolicy[];
  UnitedTechBanner: UnitedTechBanner;
  UserActions: { [key: string]: boolean };
}

export interface CalibrateAttributes {
  CalibrateDashboardType: number;
  CalibrateFamilyType: number;
  CalibrateRole: number;
  CalibrateRoleName: string;
  IsCalibrateReadOnly: boolean;
}

export interface Employee {
  BaseStation: string;
  CanChangeStation: boolean;
  CanSelfUpgradeInspector: boolean;
  CanSelfUpgradeLead: boolean;
  CostCenter: string;
  Dept: string;
  EmailAddress: string;
  EmployeeId: string;
  EtaskV3: boolean;
  FirstName: string;
  IsProfile: boolean;
  IsSecondaryStation: boolean;
  IsSelfUpgradable: boolean;
  IsSetUpStandaAlone: boolean;
  JobRole: string;
  LastName: string;
  LineStation: string;
  Lterm: string;
  LtermStation: null;
  MailCode: null;
  MiddleName: string;
  OriginalEtaskRole: string;
  PositionId: string;
  PositionTitle: string;
  PreferredName: string;
  SceptreId: null;
  Station: string;
  UpgradeReason: string;
  UpgradeType: string;
}

export interface UserPolicy {
  AppName: string;
  EmployeeId: string;
  PolicyName: string;
}

export interface UnitedTechBanner {
  Body: string;
  Header: string;
}
