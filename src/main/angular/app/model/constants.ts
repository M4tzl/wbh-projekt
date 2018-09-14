export class Constants {
    public get schulterhoehen(): string[] {
        return [
            '<20cm',
            '21-35cm',
            '51-75cm',
            '76-85cm',
            '86-100cm',
            '>100cm',
        ];
    }

    public get altersstufen(): { value: number, displayName: string }[] {
        return [
            {value: 21, displayName: "3 Wochen"},
            {value: 365, displayName: "1 Jahr"},
            {value: 2 * 365, displayName: "2 Jahre"},
            {value: 3 * 365, displayName: "3 Jahre"},
            {value: 5 * 365, displayName: "5 Jahre"},
            {value: 8 * 365, displayName: "8 Jahre"}
        ];
    }

    public get bundeslaender(): string[] {
        return [
            'Baden-Württemberg',
            'Bayern',
            'Berlin',
            'Brandenburg',
            'Bremen',
            'Hamburg',
            'Hessen',
            'Mecklenburg-Vorpommern',
            'Niedersachsen',
            'Nordrhein-Westfalen',
            'Rheinland-Pfalz',
            'Saarland',
            'Sachsen',
            'Sachsen-Anhalt',
            'Schleswig-Holstein',
            'Thüringen']
    }
}
