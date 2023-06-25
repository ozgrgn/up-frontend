import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RestService {
  apiUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}
  run() {
    return this.http.get(`${this.apiUrl}`);
  }
  getUser(userId: String) {
    return this.http.get(`${this.apiUrl}/user/${userId}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  updateUser(user: any) {
    return this.http.put(
      `${this.apiUrl}/user/${user._id}`,
      { user },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  addCategory(category: String) {
    return this.http.post(
      `${this.apiUrl}/product/category`,
      {
        category,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  getCategories() {
    return this.http.get(`${this.apiUrl}/product/categories`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  updateCategory(category: any) {
    return this.http.put(
      `${this.apiUrl}/product/category`,
      { category },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  addProduct(category: String, product: String) {
    return this.http.post(
      `${this.apiUrl}/product/product/${category}`,
      {
        product,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  deleteCategory(id: any) {
    return this.http.delete(`${this.apiUrl}/product/category/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  // CAMPAIGNS
  getCampaigns() {
    return this.http.get(`${this.apiUrl}/others/campaigns`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  addCampaign(campaign: String) {
    return this.http.post(
      `${this.apiUrl}/others/campaign`,
      {
        campaign,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  deleteCampaign(id: any) {
    return this.http.delete(`${this.apiUrl}/others/campaign/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  // TERMİNALS
  getTerminals() {
    return this.http.get(`${this.apiUrl}/others/terminals`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  addTerminal(terminal: String) {
    return this.http.post(
      `${this.apiUrl}/others/terminal`,
      {
        terminal,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  deleteTerminal(id: any) {
    return this.http.delete(`${this.apiUrl}/others/terminal/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  // Reasons
  getReasons() {
    return this.http.get(`${this.apiUrl}/others/reasons`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  addReason(reason: String) {
    return this.http.post(
      `${this.apiUrl}/others/reason`,
      {
        reason,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  deleteReason(id: any) {
    return this.http.delete(`${this.apiUrl}/others/reason/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  getAirlines() {
    return this.http.get(`${this.apiUrl}/others/airlines`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  getAirports() {
    return this.http.get(`${this.apiUrl}/others/airports`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  getAgencies() {
    return this.http.get(`${this.apiUrl}/others/agencies`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  getCompanies() {
    return this.http.get(`${this.apiUrl}/companies`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  addCompany(name: String) {
    return this.http.post(
      `${this.apiUrl}/companies`,
      {
        name,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  getCompany(companyId: String) {
    return this.http.get(`${this.apiUrl}/companies/${companyId}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  deleteCompany(id: any) {
    return this.http.delete(`${this.apiUrl}/companies/company/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  updateCompany(company: any) {
    return this.http.put(
      `${this.apiUrl}/companies/company`,
      { company },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  addInvoice(
    invoiceDate?: String,
    company?: String,
    branch?: String,
    campaign?: String,
    shopman?: String,
    destCountry?: String,
    destCity?: String,
    way?: String,
    airport?: String,
    terminal?: String,
    deparDate?: any,
    deparTime?: any,
    invoiceSerial?: String,
    invoiceNo?: String,
    airline?: String,
    flight?: String,
    agency?: String,
    guide?: String,
    note?: String,
    client?: any[],
    details?: any[],
    agencyId?: String,
    campaignId?: String,
    airlineId?: String,
    terminalId?: String
  ) {
    return this.http.post(
      `${this.apiUrl}/invoice`,
      {
        invoiceDate,
        company,
        branch,
        campaign,
        shopman,
        destCountry,
        destCity,
        way,
        airport,
        terminal,
        deparDate,
        deparTime,
        invoiceSerial,
        invoiceNo,
        airline,
        flight,
        agency,
        guide,
        note,
        client,
        details,
        agencyId,
        campaignId,
        airlineId,
        terminalId,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  getInvoices(
    limit?: number,
    skip?: number,
    company?: String,
    branch?: Boolean,
    invoiceNo?: String,
    fullName?: String,
    status?: String,
    deparDate1?: String,
    deparDate2?: String,
    invoiceDate1?: String,
    invoiceDate2?: String,
    sort?: String,
    creator?: String
  ) {
    console.log(deparDate2,"deparDate2 rent")
    let query: any = {};
    if (limit) {
      query.limit = limit;
    }
    if (skip) {
      query.skip = skip;
    }
    if (company) {
      query.company = company;
    }
    if (fullName) {
      query.fullName = fullName;
    }
    if (status) {
      query.status = status;
    }
    if (deparDate1) {
      query.deparDate1 = deparDate1;
    }
    if (deparDate2) {
      query.deparDate2 = deparDate2;
    }
    if (invoiceDate1) {
      query.invoiceDate1 = invoiceDate1;
    }
    if (invoiceDate2) {
      query.invoiceDate2 = invoiceDate2;
    }
    if (sort) {
      query.sort = JSON.stringify(sort);
    }
    if (creator) {
      query.creator = creator;
    }
    console.log(company);
    return this.http.get(`${this.apiUrl}/invoice`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
      params: query,
    });
  }

  getInvoice(invoiceId: String) {
    return this.http.get(`${this.apiUrl}/invoice/one/${invoiceId}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  approveInvoice(
    invoiceId?: string,
    status?: String,
    reasonId?: any,
    declineDate?: any,
    approveDate?: any,
    approveNo?: any
  ) {
    return this.http.post(
      `${this.apiUrl}/invoice/approved/${invoiceId}`,
      { status, reasonId, declineDate, approveDate, approveNo },

      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  updateInvoice(invoice: any) {
    return this.http.put(
      `${this.apiUrl}/invoice/${invoice._id}`,
      { invoice },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  deleteInvoice(id: any) {
    return this.http.delete(`${this.apiUrl}/invoice/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  syncInvoices() {
    return this.http.post(
      `${this.apiUrl}/services/syncInvoices`,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }


  getPerformance(
    company?: String,
    branch?: Boolean,
    noPending?: Boolean,
    year?: String,
    invoiceDate1?: String,
    invoiceDate2?: String,
    approveDate1?: String,
    approveDate2?: String,
    deparDate1?: String,
    deparDate2?: String
  ) {
    let query: any = {};
    if (noPending) {
      query.noPending = noPending;
    }
    if (company) {
      query.company = company;
    }
    if (branch) {
      query.branch = branch;
    }
    if (invoiceDate1) {
      query.invoiceDate1 = invoiceDate1;
    }
    if (invoiceDate2) {
      query.invoiceDate2 = invoiceDate2;
    }
    if (approveDate1) {
      query.approveDate1 = approveDate1;
    }
    if (approveDate2) {
      query.approveDate2 = approveDate2;
    }
    if (deparDate1) {
      query.deparDate1 = deparDate1;
    }
    if (deparDate2) {
      query.deparDate2 = deparDate2;
    }

    return this.http.get(`${this.apiUrl}/invoice/performance`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
      params: query,
    });
  }

  getProductReports(
    company?: String,
    branch?: Boolean,
    noPending?: Boolean,
    year?: String,
    invoiceDate1?: String,
    invoiceDate2?: String,
    approveDate1?: String,
    approveDate2?: String,
    deparDate1?: String,
    deparDate2?: String,
    product?: String,
    limit?: number,
    skip?: number
  ) {
    let query: any = {};
    if (noPending) {
      query.noPending = noPending;
    }
    if (company) {
      query.company = company;
    }
    if (branch) {
      query.branch = branch;
    }
    if (invoiceDate1) {
      query.invoiceDate1 = invoiceDate1;
    }
    if (invoiceDate2) {
      query.invoiceDate2 = invoiceDate2;
    }
    if (approveDate1) {
      query.approveDate1 = approveDate1;
    }
    if (approveDate2) {
      query.approveDate2 = approveDate2;
    }
    if (deparDate1) {
      query.deparDate1 = deparDate1;
    }
    if (deparDate2) {
      query.deparDate2 = deparDate2;
    }
    if (product) {
      query.product = product;
    }
    if (limit) {
      query.limit = limit;
    }
    if (skip) {
      query.skip = skip;
    }

    return this.http.get(`${this.apiUrl}/invoice/productreports`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
      params: query,
    });
  }

  getIcmal(
    limit?: number,
    skip?: number,
    company?: String,
    branch?: Boolean,
    invoiceNo?: String,
    fullName?: String,
    status?: String,
    deparDate1?: String,
    deparDate2?: String,
    approveDate1?: String,
    approveDate2?: String,
    invoiceDate1?: String,
    invoiceDate2?: String,
    sort?: Object,
    creator?: String
  ) {
    let query: any = {};
    if (limit) {
      query.limit = limit;
    }
    if (skip) {
      query.skip = skip;
    }
    if (company) {
      query.company = company;
    }
    if (branch) {
      query.branch = branch;
    }
    if (fullName) {
      query.fullName = fullName;
    }
    if (status) {
      query.status = status;
    }
    if (deparDate1) {
      query.deparDate1 = deparDate1;
    }
    if (deparDate2) {
      query.deparDate2 = deparDate2;
    }
    if (invoiceDate1) {
      query.invoiceDate1 = invoiceDate1;
    }
    if (invoiceDate2) {
      query.invoiceDate2 = invoiceDate2;
    }
    if (approveDate1) {
      query.approveDate1 = approveDate1;
    }
    if (approveDate2) {
      query.approveDate2 = approveDate2;
    }
    if (sort) {
      query.sort = JSON.stringify(sort);
    }

    console.log(company);
    return this.http.get(`${this.apiUrl}/invoice/icmal`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
      params: query,
    });
  }

  getUsers(
    limit?: number,
    skip?: number,
    fullName?: String,
    company?: Object,
    status?: Boolean,
    userType?: String
  ) {
    let query: any = {};
    if (limit) {
      query.limit = limit;
    }
    if (skip) {
      query.skip = skip;
    }
    if (status) {
      query.status = status;
    }
    if (fullName) {
      query.fullName = fullName;
    }
    if (company) {
      query.group = company;
    }
    // if (sort) {
    //   query.sort = JSON.stringify(sort);
    // }
    if (userType) {
      query.userType = userType;
    }
    return this.http.get(`${this.apiUrl}/user`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
      params: query,
    });
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.apiUrl}/user/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  updateLawsuit(lawsuit: any) {
    return this.http.put(
      `${this.apiUrl}/lawsuit/${lawsuit._id}`,
      { lawsuit },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  getResults() {
    return this.http.get(`${this.apiUrl}/others/results`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  getTypes() {
    return this.http.get(`${this.apiUrl}/others/types`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  getDtypes() {
    return this.http.get(`${this.apiUrl}/others/dtypes`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  getGeneralSettings() {
    return this.http.get(`${this.apiUrl}/settings`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  updateGeneralSettings(settings: any) {
    return this.http.put(
      `${this.apiUrl}/settings`,
      { settings },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  addContractSettings(
    startDate: String,
    endDate: String,
    lawyerComm?: Number,
    agentComm?: Number,
    kdv?: Number,
    stopaj?: Number
  ) {
    return this.http.post(
      `${this.apiUrl}/contractsettings`,
      {
        startDate,
        endDate,
        lawyerComm,
        agentComm,
        kdv,
        stopaj,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  getContractSettings() {
    return this.http.get(`${this.apiUrl}/contractsettings`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  getLawsuitContractSettings(contractDate?: any) {
    console.log(contractDate, "rest contractDate");
    return this.http.get(`${this.apiUrl}/contractsettings/lawsuit`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
      params: { contractDate },
    });
  }
  updateContractSettings(contractSettings: any) {
    return this.http.put(
      `${this.apiUrl}/contractSettings`,
      { contractSettings },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  deleteContractSettings(id: any) {
    return this.http.delete(`${this.apiUrl}/contractsettings/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  changeProcess(lawsuitId, userId, newProcess, who) {
    return this.http.post(
      `${this.apiUrl}/lawsuit/${lawsuitId}/changeprocess`,
      { userId, newProcess, who },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  changeStatus(userId, newUserStatus?, newStatus?) {
    return this.http.post(
      `${this.apiUrl}/user/${userId}/changestatus`,
      { userId, newStatus, newUserStatus },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  getMails() {
    return this.http.get(`${this.apiUrl}/mail`);
  }

  addOwner(
    name: String,
    tc: String,
    related_no: String,
    post_address: String,
    home_address: String,
    home_phone: String,
    work_address: String,
    work_phone: String,
    fax_no: String,
    mobile_no: String
  ) {
    return this.http.post(
      `${this.apiUrl}/owner`,
      {
        name,
        tc,
        related_no,
        post_address,
        home_address,
        home_phone,
        work_address,
        work_phone,
        fax_no,
        mobile_no,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  addRoom(name: String, sort: Number) {
    return this.http.post(
      `${this.apiUrl}/others/room`,
      {
        name,
        sort,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
  getRooms() {
    return this.http.get(`${this.apiUrl}/others/rooms`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  deleteRoom(roomId: string) {
    return this.http.delete(`${this.apiUrl}/others/room/${roomId}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  addMeeting(startDate: Date, finishDate: Date, room: String, lawsuit: any) {
    console.log(lawsuit, "lawsuit");
    return this.http.post(
      `${this.apiUrl}/others/meeting`,
      {
        startDate,
        finishDate,
        room,
        lawsuit,
      },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  getLawsuitMeetings(lawsuitId: String) {
    return this.http.get(`${this.apiUrl}/others/meetings/${lawsuitId}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  getMeetings() {
    return this.http.get(`${this.apiUrl}/others/meetings`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }
  deleteMeeting(id: any) {
    return this.http.delete(`${this.apiUrl}/others/meeting/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  getConflictMeetings(startDate: any, finishDate: any) {
    console.log(startDate, "rest start");
    return this.http.get(
      `${this.apiUrl}/others/conflicts/${startDate}/${finishDate}`,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
        params: { startDate, finishDate },
      }
    );
  }

  getDocumentTypes() {
    return this.http.get(`${this.apiUrl}/document/document-types`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  getDocumentTemplates(user: string) {
    return this.http.get(`${this.apiUrl}/document/document-templates`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
      params: { user },
    });
  }

  deleteDocumentTemplate(documentTemplateId: string) {
    return this.http.delete(
      `${this.apiUrl}/document/document-template/${documentTemplateId}`,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  addDocumentTemplate(
    document_type: String,
    name: String,
    content: String,
    isDefault?: Boolean
  ) {
    let data: any = {};

    data.name = name;
    data.content = content;
    if (isDefault || isDefault == false) {
      data.isDefault = isDefault;
    }
    if (document_type) {
      data.document_type = document_type;
    }

    data.user = localStorage.getItem("userId");
    return this.http.post(`${this.apiUrl}/document/document-template`, data, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  updateDocumentTemplate(
    documentTemplateId: string,
    document_type: String,
    name: String,
    content: String
  ) {
    let data: any = {};

    data.name = name;
    data.content = content;

    if (document_type) {
      data.document_type = document_type;
    }
    return this.http.put(
      `${this.apiUrl}/document/document-template/${documentTemplateId}`,
      { documentTemplate: data },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }

  addDocumentReport(document_type: String, name: String, content: String) {
    let data: any = {};

    data.name = name;
    data.content = content;

    if (document_type) {
      data.document_type = document_type;
    }

    data.user = localStorage.getItem("userId");
    return this.http.post(`${this.apiUrl}/document/document-report`, data, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  getDocumentReports(user: string) {
    return this.http.get(`${this.apiUrl}/document/document-reports`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
      params: { user },
    });
  }

  htmlToDocx(content: string) {
    return this.http.post(
      `${this.apiUrl}/document/html-to-docx`,
      { content },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
        responseType: "blob",
      }
    );
  }

  htmlToUdf(content: string) {
    return this.http.post(
      `${this.apiUrl}/document/html-to-udf`,
      { content },
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
  }
}
