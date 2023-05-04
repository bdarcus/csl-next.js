import { Style, SortType, GroupSortType } from "./style";
import { Reference, ReferenceType, Title, ID } from "./reference";
import { CiteRef } from "./citation";
import { InputBibliography } from "./bibliography";
import { Contributor } from "./contributor";
import "reflect-metadata";
import { plainToClass } from "class-transformer";

export class Processor {
	style: Style;
	//citeRefs: CiteRef[];
	bibliography: InputBibliography;

	constructor(style: Style, bibliography: InputBibliography) {
		this.style = style;
		//	this.citeRefs = CiteRef;
		this.bibliography = plainToClass(InputBibliography, bibliography);
	}

	getProcReferences(): ProcReference[] {
		const citekeys = Object.keys(this.bibliography);
		const refsObjs = citekeys.map((citekey) => {
			const pref = plainToClass(ProcReference, this.bibliography[citekey]);
			pref.citekey = citekey;
			return pref;
		});
		return refsObjs;
	}
}

export class ProcReference extends Reference {
	citekey: ID;
	disambCondition?: boolean;
	sortKeys?: string[];
	disambYearSuffix?: number;
	disambEtAlNames?: boolean;

	constructor(
		type: ReferenceType,
		title: Title,
		author: Contributor[],
		editor: Contributor[],
		disambCondition?: boolean,
		sortKeys?: string[],
		disambYearSuffix?: number,
		disambEtAlNames?: boolean,
	) {
		super(type, title, author, editor);
		this.citekey = this.citekey;
		this.disambCondition = disambCondition;
		this.sortKeys = sortKeys;
		this.disambYearSuffix = disambYearSuffix;
		this.disambEtAlNames = disambEtAlNames;
	}

	formatContributors(contributors: Contributor[]): string {
		const contribArray = contributors.map((contributor) => contributor.name);
		return contribArray.join(", ");
	}

	formatAuthors(): string {
		return this.formatContributors(this.author);
	}
}
